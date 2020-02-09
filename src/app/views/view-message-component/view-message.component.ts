import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ViewMessageService, EventEmitterService } from "./../../services";
import { Observable } from "rxjs/Rx";
import { DatePipe } from "@angular/common";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { DecimalPipe } from "@angular/common";
import { pipe, values, sortBy, prop } from "ramda";
import { FilterPipe } from "./filter.pipe";
import { RestApiService } from "../../rest-api-services";

@Component({
  templateUrl: "./view-message.component.html",
  styleUrls: ["./view-message.component.css"]
})
export class ViewMessageComponent implements OnInit {
  viewMessageContent: Object = {};
  starredMessages = [];
  readMessages = [];
  unreadMessages = [];
  isCollapsed: boolean[] = [];
  isDesc: boolean = false;
  column: string = "senderName";
  direction: number;
  search: string;
  loaded: boolean = false;
  currentMessage: Object;

  constructor(
    private _eventEmitterService: EventEmitterService,
    private _viewMessageService: ViewMessageService,
    private _router: Router,
    public _restApiService: RestApiService
  ) {}

  ngOnInit() {
    this._eventEmitterService.currentContent.subscribe(content => {
      if (
        Object.keys(content).length &&
        this._router["url"].indexOf("viewmessage") >= 0
      ) {
        this.viewMessageContent = content["view_message"];
        this._viewMessageService.getMessage().subscribe(
          messages => {
            if (messages.length) {
              this.unreadMessages = messages.filter(
                data => data["readStatus"] === "UNREAD"
              );
              this.readMessages = messages.filter(
                data => data["readStatus"] === "READ"
              );
              this.starredMessages = messages.filter(
                data => data["isStarred"] === true
              );
              this._eventEmitterService.updateUnreadMessages(
                this.unreadMessages.length
              );
            }
            this.loaded = true;
          },
          error => {
            this.loaded = true;
          }
        );
      }
    });
  }

  collapsed(event: any): void {}

  expanded(event: any): void {}

  collapse(i) {
    this.isCollapsed[i] = !this.isCollapsed[i];
  }

  addToStarred(message: Object) {
    message["isStarred"] = !message["isStarred"];
    this._viewMessageService.updateMessageStatus(message).subscribe(data => {
      let found = false;
      // pop if found else push
      this.starredMessages.forEach((msg, index, messages) => {
        if (msg["id"] === message["id"]) {
          found = true;
          messages.splice(index, 1);
        }
      });
      if (!found) {
        this.starredMessages.push(message);
      }
      this._viewMessageService.getMessage().subscribe(messages => {});
    });
  }

  setCurrentMessage(message) {
    this.currentMessage = message;
  }

  getCurrentMessage() {
    return this.currentMessage;
  }

  updateMessageStatus(message: Object) {
    message["readStatus"] = "READ";
    this._viewMessageService.updateMessageStatus(message).subscribe(data => {
      // update read message lists
      let readListFound = false;
      this.readMessages.forEach((msg, index, messages) => {
        if (msg["id"] === message["id"]) {
          readListFound = true;
          messages.splice(index, 1);
        }
      });
      if (!readListFound) {
        this.readMessages.push(message);
      }

      // update unread message lists
      let unreadListFound = false;
      this.unreadMessages.forEach((msg, index, messages) => {
        if (msg["id"] === message["id"]) {
          unreadListFound = true;
          messages.splice(index, 1);
        }
      });
      if (!unreadListFound) {
        this.unreadMessages.push(message);
      }
      this._eventEmitterService.updateUnreadMessages(
        this.unreadMessages.length
      );
    });
  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
