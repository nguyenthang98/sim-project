import { Component, OnInit } from "@angular/core";
import { SimApiService } from "../../services/sim-api.service";
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-sim-user-collection",
  templateUrl: "./sim-user-collection.component.html",
  styleUrls: ["./sim-user-collection.component.css"]
})
export class SimUserCollectionComponent implements OnInit {
  constructor(private simApiService: SimApiService, private router: Router, private spinner: NgxSpinnerService) { }

  avatarUrl: string;
  userDesigns: Array<any>;
  localUrl: string;
  userInfo: any;

  ngOnInit() {
    this.userInfo = {};
    this.localUrl = 'http://localhost:3000';
    this.localUrl = '';
    this.avatarUrl = `${this.localUrl}/${localStorage.avatar || sessionStorage.avatar}`;

    this.spinner.show();
    this.getUserInfo();
    this.simApiService.listImages().subscribe(res => {
      this.spinner.hide();
      this.userDesigns = res.content || [];
    });
  }

  changeAvatar() {
    const inputFile = document.createElement("input");
    inputFile.type = "file";

    inputFile.addEventListener("change", () => {
      if (inputFile.files[0]) {
        const file = <File>inputFile.files[0];
        const payload = new FormData();
        payload.append("file", file, file.name);
        this.spinner.show();
        this.simApiService.changeAvatar(payload).subscribe(res => {
          if (localStorage.getItem('avatar')) {
            localStorage.setItem('avatar', res.content);
          } else {
            sessionStorage.setItem('avatar', res.content);
          }
          this.spinner.hide();
          location.reload();
        });
      }
    });

    inputFile.click();
  }

  getUserInfo() {
    this.simApiService.getUserInfo().subscribe(res => {
      // console.log(res.content);
      this.userInfo = res.content;
    })
  }

  downloadImage(image) {
    let payload = image;
    this.simApiService.downloadImage(payload).subscribe(res => {
      const a = document.createElement('a');
      a.download = image.name || 'untitled';
      a.href = URL.createObjectURL(res);
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.parentNode.removeChild(a);
    }, err => {
      console.error(err);
    })
  }

  deleteImage(image, index) {
    let payload = image;
    this.simApiService.deleteImage(payload).subscribe(res => {
      this.userDesigns.splice(index, 1);
    }, err => {
      console.error(err);
    })
    // location.reload();
  }
}
