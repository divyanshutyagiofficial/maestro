import { OnInit, Component, Class } from "@angular/core";

@Component({
  selector: "app-loading",
  template: `
    <div class="loading"></div>
  `,
  styleUrls: ["./pages.component.css"]
})
export class LoadingComponent implements OnInit {
  ngOnInit() {}
}
