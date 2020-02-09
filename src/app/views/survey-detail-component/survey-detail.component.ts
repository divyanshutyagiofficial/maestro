import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
  AfterContentChecked,
  ViewChildren,
  QueryList
} from "@angular/core";
import { Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";
import { SurveyDetailData } from "./surveyDetailData";
import {
  SurveyDetailService,
  ProgramService,
  UserService,
  EventEmitterService,
  DashboardService,
  SurveyService
} from "../../services";
import { HttpClient } from "@angular/common/http";
import { SurveyApiService } from "../../rest-api-services";
import { DomSanitizer } from "@angular/platform-browser";
import { URL } from "url";

@Component({
  selector: "app-survey-detail",
  templateUrl: "./survey-detail.component.html",
  styleUrls: ["./survey-detail.component.css"]
})
export class SurveyDetailComponent implements OnInit {
  @HostListener("window: beforeunload", ["$event"]) unloadHandler(
    event: Event
  ) {
    confirm(this.surveyDetailData["placeholder"]["survey_detail"][29]);
    event.returnValue = true;
  }

  @ViewChildren("drawImage") drawImage: QueryList<ElementRef>;
  @ViewChild("myCanvas") public canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  pos = { x: 0, y: 0 };
  offset: number = new Date().getTimezoneOffset() * 60000;
  page: any;
  data: any;
  previousPageId: number;
  storage: any = [];
  navArray: any = [];
  pageNumber: number;
  lastAnswerPageId: number;
  currentPageId: number;
  percentageComplete: number;
  startTime: number;
  timeSpent: number = 0;
  radio: number;
  rating: number;
  fileUrl;
  surveyStartTime: number;
  currentQuestion: Object;
  pointerSize: number = 5;
  imageLoaded: boolean = false;
  editCanvas: boolean = false;

  public width = 495;
  public height = 445;
  public pointerColor = "#000000";

  constructor(
    private _router: Router,
    private surveyDetail: SurveyDetailService,
    public _programService: ProgramService,
    private _eventEmitterService: EventEmitterService,
    public surveyDetailData: SurveyDetailData,
    private userService_: UserService,
    private _surveyApiService: SurveyApiService,
    private _dashboardData: DashboardService,
    private _surveyService: SurveyService,
    private sanitizer: DomSanitizer,
    private location: PlatformLocation
  ) {
    this.surveyDetailData.reset();
    this.data = null;
    window.history.pushState(null, null, window.location.href);
    location.onPopState(async () => {
      await this.handleBrowserBack();
    });
  }

  async handleBrowserBack() {
    this.surveyDetailData.homeModal = true;
  }
  ngOnInit() {
    this.surveyDetailData.reset();
    this.data = null;
    this._eventEmitterService.currentContent.subscribe(content => {
      this.surveyDetailData.placeholders = content;
      if (this._programService.isAdhoc()) {
        this.getAdhocData();
      } else if (this._programService.isCRO()) {
        this.getCroData();
      } else {
        this.getSurveyData();
      }
    });
  }
  onMouseMove(e) {
    //e.preventDefault();
    this._surveyService.onMouseMove(
      e,
      this.pointerColor,
      this.pointerSize,
      this.pos
    );
  }
  onMouseDown(e) {
    //e.preventDefault();
    this._surveyService.onMouseDown(e, this.pos);
  }
  resetCanvas() {
    this.editCanvas = true;
    let canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    let ctx = canvas && canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //this._surveyService.initializeCanvas();
  }
  canvasToBase64(canvas) {
    let base64 = canvas.toDataURL("image/png");
    return base64;
  }

  // changeDrawline() {
  //   let canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
  //   let ctx = canvas && canvas.getContext("2d");
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   this._surveyService.initializeCanvas();
  // }
  async finishCanvas(question) {
    question.url = "";
    let canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    let content = this.canvasToBase64(canvas);
    let id = this.getCurrentQuestion()["id"];
    var blobBin = atob(content.split(",")[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: "image/png" });
    var formdata = new FormData();
    formdata.append("uploadedFile", file, `canvas.png${new Date().getTime()}`);
    this.saveCanvas(formdata, id, content);
    this.editCanvas = false;
    //this.editDrawline = true;
  }
  saveCanvas(formData, id, base64) {
    /// for multiple media types
    if (formData) {
      this._surveyApiService.uploadFile(formData).subscribe(
        data => {
          if (data) {
            let answer = {
              id: null,
              questionId: id,
              choiceId: null,
              answerFreeText: "",
              score: 0,
              fileId: data
            };
            this.checkAndPush(answer, base64);
          }
        },
        error => {
          alert("File exceeded server limit. Try uploading a smaller one.");
        }
      );
    } else {
      alert(this.surveyDetailData.placeholders["survey_detail"]["26"]);
    }
  }
  updatePointerColor(e) {
    this.pointerColor = e.target.value;
  }
  onMouseEnter(e) {
    this._surveyService.onMouseEnter(e, this.pos);
  }
  _setPointerSize(value) {
    this.pointerSize = value;
  }
  _getPointerSize() {
    return this._surveyService.getPointerSize();
  }
  getAdhocData() {
    this.surveyDetail.getAdhocData().subscribe(
      data => {
        this.data = data;
        this._programService.setSurveyType(data["survey"]["type"]);
        this.loadSurvey();
      },
      error => {
        if (error) {
          this._router.navigate(this._router.navigate["/adhoc-login"]);
        }
      }
    );
  }
  async onImageLoad(e) {
    await this._surveyService.initializeCanvas();
    this.imageLoaded = true;
  }
  getCroData() {
    this.surveyDetail.getCroData().subscribe(
      data => {
        this.data = data;
        this._programService.setSurveyType(data["survey"]["type"]);
        this.loadSurvey();
      },
      error => {
        if (error) {
          this._router.navigate(this._router.navigate["/404"]);
        }
      }
    );
  }
  getSurveyData() {
    this.surveyDetail.getSurveyData().subscribe(
      data => {
        this.data = data;
        this._programService.setSurveyType(data["survey"]["type"]);
        this.loadSurvey();
      },
      error => {
        this._router.navigate(this._router.navigate["/dashboard"]);
      }
    );
  }
  loadSurvey() {
    this.lastAnswerPageId = this.data["userSurveySession"][
      "userSurveySessionDetail"
    ]["lastAnswerPageId"];
    if (this.lastAnswerPageId === 0) { // survey is being attempted for the first time...
      this.page = this.data.survey["pages"].filter(
        page => page.pageNumber === 1
      )[0];
      this.startTime = Math.round(new Date().getTime()) - this.offset;
      this.surveyStartTime = this.startTime + this.offset;
      this.generateParams();
      this.addNewNavEntry(0, this.currentPageId);
      //this.updateNavArray();
    } else {  // Previously attempted survey...
      this.setIncomingStorageArray();
      this.page = this.data.survey["pages"].filter(
        page => page["id"] === this.lastAnswerPageId
      )[0];
      this.removeBlankArray();
      this.startTime = this.data["userSurveySession"][
        "userSurveySessionDetail"
      ]["startTime"];
      this.navArray = this.data["userSurveySession"]["pageNavigations"];
      this.timeSpent = this.data["userSurveySession"][
        "userSurveySessionDetail"
      ]["timeSpent"];
      this.surveyStartTime = Math.round(new Date().getTime());
      this.generateParams();
      this.plotValues();
      setTimeout(() => {
        let bar = document.getElementById("progress_bar") as HTMLElement;
        bar.style.width =
          this.data["userSurveySession"]["userSurveySessionDetail"][
          "percentageComplete"
          ] + "%";
      }, 400);
    }
  }
  generatePage(pageId) {
    this.page = this.data.survey["pages"].filter(page => page.id === pageId)[0];
    this.generateParams();
  }
  isQuestion() {
    let count = 0;
    if (this.page) {
      this.page["sections"].forEach(section => {
        count = count + section["questions"].length;
      });
    }
    return count > 0;
  }
  sanitizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  plotValues() {
    this.data["survey"]["pages"].forEach(page => {
      //plotting value
      page["sections"].forEach(section => {
        section["questions"].forEach(question => {
          this.storage.forEach(array => {
            array["response"].forEach(object => {
              if (object["questionId"] == question["id"]) {
                switch (question["answerType"]) {
                  case "DROP_DOWN":
                    question["choiceId"] = object["choiceId"];
                    question["freeText"] = object["answerFreeText"];
                    break;
                  case "RADIO_BUTTON":
                    question["choice"] = object["choiceId"];
                    break;
                  case "CHECK_BOX":
                    question["choices"].forEach(choice => {
                      object["answerFreeText"]
                        .toString()
                        .split(",")
                        .forEach(value => {
                          if (choice["id"].toString() == value) {
                            choice["isSelected"] = true;
                          }
                        });
                    });
                    break;
                  case "BP":
                    question["sys"] = object["answerFreeText"].split("/")[0];
                    question["dia"] = object["answerFreeText"].split("/")[1];
                    break;
                  case "AUDIO_UPLOAD":
                  case "IMAGE_UPLOAD":
                  case "VIDEO_UPLOAD":
                  case "DRAW":
                    if (object["fileId"]) {
                      this._surveyApiService
                        .getFile(object["fileId"])
                        .subscribe(file => {
                          let reader = new FileReader();
                          let url = "";
                          reader.readAsDataURL(file["file"]);
                          reader.onload = event => {
                            url = (<FileReader>event.target).result;
                            question["url"] = url;
                            question["isAttempted"] = true;
                          };
                        });
                    }
                    break;
                  default:
                    question["freeText"] = object["answerFreeText"];
                }
              }
            });
          });
        });
      });
    });
  }
  returnNextPageId(page) {
    let nextPageId;
    page["navigationRules"].forEach(obj => {
      this.storage.forEach(answer => {
        if (answer.pageId === this.currentPageId) {
          answer.response.forEach(ans => {
            let qid = ans.questionId, cid = ans.choiceId;  //WARNING: DO NO DELETE THESE UNUSED VARIABLE, THESE ARE BEING USED IN eval(); 
            let newRule = this.replaceAll(obj.rule, "=", "===");
            // alert(JSON.stringify(this.strEval(obj.rule)))
            if (eval(newRule) === true || obj.rule === "") {
              nextPageId = obj.nextPageId;
            }
          })
        }
      })
    });
    return nextPageId;
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  // strEval(str) {  // Return true or false on basis of condition provided in String...
  //   alert(str);
  //   try {
  //     return new Function('return ' + str)();
  //   }
  //   catch (err) {
  //     return ""
  //   }
  //   //return true;
  // }
  generateParams() {
    this.currentPageId = this.page && this.page["id"];
    this.lastAnswerPageId = this.currentPageId; //update last answer page id
    //let nextPageId = this.page.navigationRule.nextPageId;
    this.pageNumber = this.page && this.page.pageNumber;
    this.percentageComplete = this.data["userSurveySession"][
      "userSurveySessionDetail"
    ]["percentageComplete"];
    //this.updateNavArray();
    // new code implemented on 11th July'19 `Author: Divyanshu Tyagi`
    let currentQuestion = this.page && this.page.sections[0].questions[0];
    this.setCurrentQuestion(currentQuestion);
  }
  updateNavArray() { // populates previous Page Id
    let pageNav = {
      previousPageId: 0,
      currentPageId: this.currentPageId
      //nextPageId: this.page["navigationRule"]["nextPageId"]
    };
    for (let i = 0; i < this.navArray.length; i++) {
      // Removing Duplicate entries
      if (this.navArray[i]["currentPageId"] === this.page.id) {
        //(if any)
        pageNav = this.navArray[i];
        this.navArray.splice(i, 1);
      }
    }
    this.navArray.push(pageNav);
  }
  appendNextPageId(currentPageId, nextPageId) {
    this.navArray.forEach(obj => {
      if (obj.currentPageId === currentPageId) {
        obj["nextPageId"] = nextPageId; //append next page Id on Next Button.
      }
    });
  }

  addNewNavEntry(currentPageId, nextPageId) {
    let isEntryPresent = false;
    let entry = this.navArray.forEach(navObj => {
      if (navObj.currentPageId === nextPageId) {
        isEntryPresent = true
      }
    })
    if (isEntryPresent === false) { // check if entry already exists with current Page Id.
      this.navArray.push({   // adding a new object with previous page id...
        previousPageId: currentPageId,
        currentPageId: nextPageId
      })
    }
  }
  checkAttemptedAnswers(): boolean {
    let flag = false;
    let attemptedQuestionCount = 0;
    let questionCount = 0;
    this.storage.forEach(object => {
      if (object["pageId"] == this.currentPageId) {
        attemptedQuestionCount = object["response"].length || 0;
      }
    });
    this.page["sections"].forEach(section => {
      questionCount = questionCount + section["questions"].length;
    })
    if (attemptedQuestionCount == questionCount) {
      flag = true;
    }
    return flag;
  }
  setCurrentQuestion(question) {
    this.currentQuestion = question;
  }
  getCurrentQuestion() {
    return this.currentQuestion;
  }
  isSkipped() {
    let flag = false;
    let entry = this.storage.filter(
      entry => entry["pageId"] === this.page["id"]
    )[0];
    let currentQuestion = this.getCurrentQuestion();
    entry &&
      entry["response"] &&
      entry["response"].forEach(answer => {
        if (
          answer["questionId"] === currentQuestion["id"] &&
          answer["answerFreeText"] === "" &&
          answer["choiceId"] === 0 &&
          answer["fileId"] === 0
        ) {
          flag = true;
        }
      });
    return flag;
  }
  isQuestionAttempted(questionId) {
    console.log(questionId);
    let pageId = this.page.id;
    console.log(this.storage);
    let flag = false;
    this.storage && this.storage.forEach(entry => {
      if (entry.pageId === pageId) {
        entry && entry.response.forEach(obj => {
          if (obj.questionId === questionId) {
            flag = true;
          }
        })
      }
    });
    return flag;
  }
  isEntryPresent() {
    let currentPageId = this.page["id"];
    let result = this.storage.filter(entry => entry.pageId === currentPageId);
    return result && result.length > 0;
  }
  addBlankEntryToAnswerLogs() {
    let currentQuestionId = this.getCurrentQuestion()["id"];
    let currentPageId = this.page["id"];
    this.storage.push({
      pageId: currentPageId,
      response: [
        {
          id: null,
          questionId: currentQuestionId,
          answerFreeText: "",
          choiceId: 0,
          fileId: 0
        }
      ]
    });
  }
  updateExistingEntryInAnswerLogs() {
    let currentQuestionId = this.getCurrentQuestion()["id"];
    let currentPageId = this.page["id"];
    this.storage.forEach((page, i) => {
      if (page.pageId == currentPageId) {
        page["response"].forEach((response, j) => {
          if (response["questionId"] === currentQuestionId) {
            response["choiceId"] = 0;
            response["answerFreeText"] = "";
            response["fileId"] = 0;
          }
        });
      }
    });
  }
  isLastQuestion() {
    let data = this.data;
    return this.data.survey.pages.length === this.page.pageNumber;
  }
  removeEntryfromStorage() {
    let currentQuestionId = this.getCurrentQuestion()["id"];
    let currentPageId = this.page["id"];
    this.getCurrentQuestion()["choice"] = 0;
    let isPagePresent = this.storage.filter(
      entry => entry.pageId === currentPageId
    );
    if (this.isEntryPresent()) {
      this.updateExistingEntryInAnswerLogs();
    } else {
      this.addBlankEntryToAnswerLogs();
    }
  }
  async skip() {
    await this.removeEntryfromStorage();
    if (
      this.getCurrentQuestion() &&
      this.getCurrentQuestion()["required"] === false &&
      this.isLastQuestion() === false
    ) {
      let nextPageId = this.returnNextPageId(this.page);
      let currentPageId = this.currentPageId;
      await this.generatePage(nextPageId); // Method for generating next page on the basis of pageId provided..
      await this.appendNextPageId(currentPageId, nextPageId);
      await this.addNewNavEntry(currentPageId, nextPageId);
      await this.removeBlankArray();
      this.getCurrentQuestion()["isAttempted"] = false;
    }

    if (this.isLastQuestion() === true && this.getCurrentQuestion()["required"] === false) {
      await this.addBlankEntryToAnswerLogs();
      await this.submitFinal();
    }
  }
  async next() {
    if (
      this.getCurrentQuestion()["required"] === false &&
      this.isEntryPresent() === false
    ) {
      await this.addBlankEntryToAnswerLogs();
    }

    if (this.checkAttemptedAnswers()) {
      let nextPageId = this.returnNextPageId(this.page);
      let currentPageId = this.currentPageId;
      await this.generatePage(nextPageId); // Method for generating next page on the basis of pageId provided..
      await this.appendNextPageId(currentPageId, nextPageId);
      await this.addNewNavEntry(currentPageId, nextPageId);
      await this.removeBlankArray();
    } else {
      alert("Please answer the question to move forward.");
    }
    this.updateProgress();
  }
  previous() {
    let previousPageId =
      this.navArray.filter(navObj => {
        return (navObj.currentPageId === this.currentPageId)
      })[0].previousPageId || 0;
    this.previousPageId = previousPageId;
    if (this.data.survey.surveyConfig.branching === true) { // keep removing last entry if its a branching question...
      this.removeEntryFromNavArray(this.currentPageId);
    }
    this.generatePage(previousPageId);
  }
  removeEntryFromNavArray(currentPageId) {
    this.navArray.forEach((obj, i) => {
      if (obj.currentPageId === currentPageId) {
        this.navArray.splice(i, 1);
      }
    })
  }
  choose(id: any, questionId, score: number, text?: string, mediaUrl?: string) {
    //saves radio button values
    let freeText = text || "";
    if (id && id != 0) {
      let answers = {
        id: null,
        questionId: questionId,
        choiceId: id,
        answerFreeText: freeText,
        score: score,
        fileId: null
      };
      this.checkAndPush(answers, mediaUrl);
    }
  }
  check(id: any, questionId, score: number) {
    //checkBox
    if (id && id != 0) {
      let choiceValues = "";
      this.page["sections"].forEach(section => {
        section["questions"].forEach(question => {
          question["choices"].forEach(choice => {
            if (choice["isSelected"]) {
              choiceValues = choiceValues + choice["id"] + ",";
            }
          });
        });
      });
      if (choiceValues.length) {
        choiceValues = choiceValues.replace(/,\s*$/, "");
        let answers = {
          id: null,
          questionId: questionId,
          choiceId: 0,
          answerFreeText: choiceValues,
          score: score,
          fileId: null
        };
        this.checkAndPush(answers);
      } else {
        this.removePreviousEntry(questionId);
        setTimeout(() => {
          //this.updateNavArray();
        }, 100);
      }
    }
  }
  save(value: any, id: number) {
    //saves text and numeric values
    if (value) {
      let answer = {
        id: null,
        questionId: id,
        choiceId: null,
        answerFreeText: value,
        score: 0,
        fileId: null
      };
      this.checkAndPush(answer);
    } else {
      this.removePreviousEntry(id);
      setTimeout(() => {
        //this.updateNavArray();
      }, 100);
    }
  }
  fileEvent($event, id: number) {
    /// for multiple media types
    let file = $event.target.files[0];
    if ($event.target.files.length != 0) {
      this.fileUrl = null;
      let formData = new FormData();
      formData.append("uploadedFile", file);
      let body = formData;
      this._surveyApiService.uploadFile(body).subscribe(
        data => {
          if (data) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = event => {
              let url;
              let answer = {
                id: null,
                questionId: id,
                choiceId: null,
                answerFreeText: "",
                score: 0,
                fileId: data
              };
              url = (<FileReader>event.target).result;
              setTimeout(() => {
                this.checkAndPush(answer, url);
              }, 0);
            };
          }
        },
        error => {
          alert("File exceeded server limit. Try uploading a smaller one.");
        }
      );
    } else {
      alert(this.surveyDetailData.placeholders["survey_detail"]["26"]);
    }
  }
  setUrl(url) {
    this.fileUrl = url;
  }
  getUrl() {
    return this.fileUrl;
  }
  isValid(
    value1: number,
    lowerLimit1: number,
    UpperLimit1: number,
    value2?: number,
    lowerLimit2?: number,
    upperLimit2?: number
  ) {
    return (
      value1 >= lowerLimit1 &&
      value1 <= UpperLimit1 &&
      value2 >= lowerLimit2 &&
      value2 <= upperLimit2
    );
  }
  bp(question) {
    let id = question.id;
    let systolic = question.sys;
    let diastolic = question.dia;
    let validation = this.isValid(systolic, 50, 250, diastolic, 50, 150);
    if (systolic && diastolic && validation) {
      question.error = false;
      let answer = {
        id: null,
        questionId: id,
        choiceId: null,
        answerFreeText: systolic + "/" + diastolic,
        score: 0,
        fileId: null
      };
      this.checkAndPush(answer);
    } else {
      question.error = true;
      this.removePreviousEntry(id);
      setTimeout(() => {
        //this.updateNavArray();
      }, 100);
    }
  }
  removePreviousEntry(questionId) {
    // This function does not return any value but make changes in storage array.
    this.storage.forEach(object => {
      // removing responses entries if entries with same page id exists.
      if (object["pageId"] == this.currentPageId) {
        object["response"].forEach((entry, i) => {
          if (entry["questionId"] == questionId) {
            object["response"].splice(i, 1);
          }
        });
      }
    });
  }
  addNewEntry(answer) {
    this.storage.forEach(object => {
      // pushing updated entry
      if (object["pageId"] == this.currentPageId) {
        object["response"].push(answer);
      }
    });
  }
  checkAndPush(answer, mediaUrl?) {
    // Common function for all input types
    let pageFlag = false;
    this.storage.forEach(object => {
      // check if an object for current page ID already exists.
      if (object["pageId"] == this.currentPageId) {
        pageFlag = true;
      }
    });

    if (pageFlag) {
      let questionFlag = false;
      this.removePreviousEntry(answer["questionId"]);
      this.addNewEntry(answer);
    } else {
      this.storage.push({ pageId: this.currentPageId, response: [answer] }); // pushing new page entry if no page Id exists.
    }

    /* this function could be better performed in individual html input type */
    this.page["sections"][0]["questions"].forEach(question => {
      // simultaneous value plotting..
      if (question["id"] == answer["questionId"]) {
        question["url"] = null;
        setTimeout(() => {
          question["isAttempted"] = true;
          question["choice"] = answer["choiceId"];
          question["freeText"] = answer["answerFreeText"];
          question["sys"] =
            "" + answer["answerFreeText"].toString().split("/")[0]; // Used blank string to prevent error for numeric values.
          question["dia"] =
            "" + answer["answerFreeText"].toString().split("/")[1];
          question["url"] = mediaUrl;
        }, 0);
      }
      /*question['choices'].forEach(choice => {
				if(choice['id'] == answer[])
			})*/
    });

    this.removeBlankArray();
    //this.updateProgress();
  }
  updateProgress() {
    let bar = document.getElementById("progress_bar") as HTMLElement;
    //let attemptedQuestions = this.returnAttemptedQuestions();
    //let totalQuestions = this.returnTotalQuestions();
    //this.percentageComplete = (attemptedQuestions / totalQuestions) * 100;
    let visitedPages = this.navArray.length;
    let totalPages = this.data["survey"]["pages"].length;
    this.percentageComplete = ((visitedPages - 1) / totalPages) * 100;
    bar.style.width = this.percentageComplete + "%";
  }
  returnAttemptedQuestions() {
    let attemptedQuestions = 0;
    this.storage.forEach(object => {
      object["response"].forEach(response => {
        if (response["questionId"]) {
          attemptedQuestions = attemptedQuestions + 1;
        }
      });
    });
    return attemptedQuestions;
  }
  returnTotalQuestions() {
    let totalQuestions = 0;
    this.data["survey"]["pages"].forEach(page => {
      page["sections"].forEach(section => {
        section["questions"].forEach(question => {
          if (question["id"]) {
            totalQuestions = totalQuestions + 1;
          }
        });
      });
    });
    return totalQuestions;
  }
  setIncomingStorageArray() {
    this.data["survey"]["pages"].forEach(page => {
      let response = [];
      page["sections"].forEach(section => {
        section["questions"].forEach(question => {
          this.data["userSurveySession"]["userAnswerLogs"].forEach(object => {
            if (object["questionId"] == question["id"]) {
              response.push(object);
            }
          });
        });
      });
      this.storage.push({ pageId: page["id"], response: response });
    });
  }
  setOutgoingStorageArray() {
    var newStorage = [];
    this.storage.forEach((object, i) => {
      object["response"].forEach((response, j) => {
        delete response["questionCode"];
        newStorage.push(response);
      });
    });
    return newStorage;
  }
  removeBlankArray() {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i].length === 0) {
        this.storage.splice(i, 1);
      }
    }
  }
  calculateScore() {
    let score = 0;
    let total = 0;
    this.storage.forEach(object => {
      object["response"].forEach(response => {
        if (response["choiceId"]) {
          score = score + response["score"];
          total = total + 1;
        }
      });
    });
    return (score / total) * 100;
  }
  closeDroModal() {
    console.log(this.data.survey.surveyConfig.autoSave)
    if (!this.data.survey.surveyConfig.autoSave) {
      if (window.confirm("Your progess will not be saved if you quit.")) {
        this.closeDRO();
      }
    } else {
      this.surveyDetailData.savingProgressModal = true;
    }
  }
  postData(percentageCompleted, progressStatus, endTime, timeSpent, route?) {
    this._dashboardData.clearCache();
    let newStorage = this.setOutgoingStorageArray();
    this.surveyDetail
      .postSurveyData(
        this.data,
        progressStatus,
        endTime,
        percentageCompleted,
        timeSpent,
        this.lastAnswerPageId,
        this.startTime,
        this.navArray,
        newStorage
      )
      .subscribe(
        async data => {
          await this._dashboardData.clearCache();
          await this._surveyService.clearCache();
          await this._programService.clearSchedules();
          await this._programService.setExistingSchedule([]);
          await this._programService.setExistingPages([]);
          if (this._programService.isAdhoc() && percentageCompleted === 100) {
            this.userService_.logout();
          }
          //this.data = null;
          await this._router.navigate([route]);
        },
        error => {
          alert(this.surveyDetailData.placeholders["error_messages"]["3"]);
          this._router.navigate([this.returnRoute("submit")]);
        }
      );
  }
  closeDRO() {
    let progressStatus = "STARTED";
    let endTime = 0;
    let timeSpent =
      (Math.round(new Date().getTime()) - this.surveyStartTime) / 1000 +
      this.timeSpent;
    let route = "";
    switch (true) {
      case this._programService.isAdhoc():
        route = "/adhoc-login";
        break;
      case this._programService.isCRO():
        route = "/cro-thankyou";
        break;
      case !this._programService.isCRO() && !this._programService.isAdhoc():
        route = "/dashboard";
        break;
      default:
        route = "/dashboard";
    }
    this.postData(
      this.percentageComplete,
      progressStatus,
      endTime,
      timeSpent,
      route
    );
  }
  openHelpModal(text?: string) {
    this.surveyDetailData.helpText = text;
    this.surveyDetailData.helpModal = true;
  }
  droHome() {
    /*let result = window.confirm(
      "Are you sure you want to leave this page? Your progress will be saved."
    )*/
    /*if (
      result === true
    ) {*/
    let progressStatus = "STARTED";
    let endTime = 0;
    let timeSpent =
      (Math.round(new Date().getTime()) - this.surveyStartTime) / 1000 +
      this.timeSpent;
    let route = this.returnRoute("dro-home");
    this.postData(
      this.percentageComplete,
      progressStatus,
      endTime,
      timeSpent,
      route
    );
    //}
  }
  async submitModal() {
    if (
      this.getCurrentQuestion()["required"] === false &&
      this.isEntryPresent() === false
    ) {
      await this.addBlankEntryToAnswerLogs();
    }

    if (this.checkAttemptedAnswers()) {
      this.submitFinal();
    } else {
      alert(this.surveyDetailData.placeholders["survey_detail"]["25"]);
    }
  }
  submitFinal() {
    let bar = document.getElementById("progress_bar") as HTMLElement;
    bar.style.width = 100 + "%";
    setTimeout(() => {
      this.surveyDetailData.submitSuccessModal = true;
    }, 1000);
  }
  returnRoute(destination) {
    switch (destination) {
      case "close-dro":
        switch (this._programService.isAdhoc()) {
          case true:
            return "/adhoc-intent";
          case false:
            return "/intent";
        }
      case "dro-home":
        switch (this._programService.isAdhoc()) {
          case true:
            return "/adhoc-intent";
          case false:
            return "/intent";
        }
      case "submit":
        switch (true) {
          case this._programService.isAdhoc():
            switch (this._programService.getSurveyType() == "TRAINING") {
              case true:
                return "/result/" + this.calculateScore();
              case false:
                return "/thankyou";
            }

          case this._programService.isCRO():
            switch (this._programService.getSurveyType() == "TRAINING") {
              case true:
                return "/result" + this.calculateScore();
              case false:
                return "/cro-thankyou";
            }

          default:
            switch (this._programService.getSurveyType() == "TRAINING") {
              case true:
                return "/result" + this.calculateScore();
              case false:
                return "/dashboard";
            }
        }
    }
  }
  submit() {
    let progressStatus = "COMPLETED";
    let endTime = Math.round(new Date().getTime()) - this.offset;
    let timeSpent =
      (Math.round(new Date().getTime()) - this.surveyStartTime) / 1000 +
      this.timeSpent;
    let route = this.returnRoute("submit");
    this.postData(100, progressStatus, endTime, timeSpent, route);
    this._programService.setUserSurveySessionId(0);
  }
  /*--- These are temporary methods, needed to be removed later*/
  isHyperText(text) {
    return (
      text.includes("</style>") ||
      text.includes("</div>") ||
      text.includes("</ul>")
    );
  }

}
