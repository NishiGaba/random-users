import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "random-user";
  user: any = null;
  loadingBlock = false;
  requests = 0; //Number of API requests

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
  }

  fetchUser() {
    this.userService.getUser().subscribe(
      (user: any) => {
        //Decrementing the number of requests by 1 after getting response from API
        this.requests = this.requests - 1;
        if(this.requests == 0) {
          this.user = user.results[0]; 
          this.loadingBlock = false;
        }    
      },
      (err) => {
        //Decrementing the number of requests by 1 after getting response from API
        this.requests = this.requests - 1;
        if(this.requests == 0) {
          this.toastr.error(err.status, "Oopps,Try Again");
          this.loadingBlock = false;
        }   
      },
    );
  }

  handleClick() {
    this.user = null;
    this.loadingBlock = true;
    //Incrementing the number of requests by 1 on user click
    this.requests = this.requests + 1;
    let angularThis = this;

    setTimeout(function(){
      angularThis.fetchUser();
    }, 2000);
  }
}
