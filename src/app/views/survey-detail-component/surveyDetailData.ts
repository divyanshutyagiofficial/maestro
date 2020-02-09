import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

export class SurveyDetailData {

	public data: any;
	public page_number: number;
	public previous: boolean;
	public show_submit: boolean;
	public show_next: boolean;
	public isValid: boolean;
	public page: any;

	public surveyType: String;
	public pos: number;
	public question_id: number;
	public choice: any;
	public section_number: number;
	public question_number: number;
	public index: number;
	public storage: any;
	public navArray: any;
	public input_type: string;
	public url: SafeResourceUrl;
	public sections: any;
	public placeholders: any;
	public percentageComplete: number;
	public startTime: number;
	public endTime: number;
	public lastTime: number;
	public timeSpent: number;
	public lastAnswerPageId: number;
	public previousPageId: number;
	public currentPageId: number;
	public nextPageId: number;
	public routeFlag: boolean;
	public offset: number;
	public savingProgressModal: boolean;
	public submitSuccessModal: boolean;
	public homeModal: boolean;
	public error: boolean;
	public progressStatus: string;
	//Input type variables
	public slideFlag: boolean;
	public date: any;
	public id: number;
	public text: string;
	public numeric: number;
	public range: any;
	public checks: any;
	public star: number;
	public rich: string;
	public time: number;
	public option: any;
	public helpModal: boolean;
	public helpText: string

	private init() {
		this.surveyType = null;
		this.pos = null;
		this.data = null;
		this.question_id = null;
		this.choice = null;
		this.page_number = null;
		this.section_number = 0;
		this.previous = false;
		this.show_submit = false;
		this.show_next = true;
		this.question_number = 0;
		this.index = null;
		this.storage = [];
		this.navArray = [];
		this.page = null;
		this.input_type = null;
		this.url = '';
		this.sections = null;
		this.placeholders = null;
		this.percentageComplete = null;
		this.startTime = Math.round(new Date().getTime());
		this.endTime = 0;
		this.lastTime = 0;
		this.timeSpent = 0;
		this.lastAnswerPageId = null;
		this.previousPageId = 0;
		this.currentPageId = null;
		this.nextPageId = null;
		this.routeFlag = false;
		this.offset = new Date().getTimezoneOffset() * 60000;
		this.savingProgressModal = false;
		this.submitSuccessModal = false;
		this.error = false;
		this.progressStatus = "STARTED";
		this.helpText = "";
		//Input type variables
		this.isValid = true;
		this.slideFlag = false;
		this.date = null;
		this.id = null;
		this.text = null;
		this.numeric = null;
		this.range = null;
		this.checks = [];
		this.star = null;
		this.rich = null;
		this.time = null;
		this.option = null;
		this.helpModal = false;
		this.homeModal = false;
	}

	reset() {
		this.init();
	}

	setInputNull() {
		this.id = null;
		this.text = null;
		this.numeric = null;
		this.range = null;
		this.checks = [];
		this.date = null;
		this.star = null;
		this.rich = null;
		this.time = null;
		this.option = null;
	}


}