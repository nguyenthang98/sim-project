import { Component, OnInit } from "@angular/core";
import { SimApiService } from "../../services/sim-api.service";
import { Router } from '@angular/router'

const localUrl = 'http://localhost:3000';

@Component({
    selector: "app-sim-user-collection",
    templateUrl: "./sim-user-collection.component.html",
    styleUrls: ["./sim-user-collection.component.css"]
})
export class SimUserCollectionComponent implements OnInit {
    constructor(private simApiService: SimApiService, private router: Router) { }

    avatarUrl: string;

    ngOnInit() {
        this.avatarUrl = `/${localStorage.avatar ||
            sessionStorage.avatar}`;
        // this.avatarUrl = `${localUrl}/${localStorage.avatar ||
        //     sessionStorage.avatar}`;
    }

    changeAvatar() {
        const inputFile = document.createElement("input");
        inputFile.type = "file";

        inputFile.addEventListener("change", () => {
            const file = <File>inputFile.files[0];
            const payload = new FormData();
            payload.append("file", file, file.name);
            this.simApiService.changeAvatar(payload).subscribe(res => {
                if (localStorage.getItem('avatar')) {
                    localStorage.setItem('avatar', res.content);
                } else {
                    sessionStorage.setItem('avatar', res.content);
                }
                location.reload();
            });
        });

        inputFile.click();
    }
}
