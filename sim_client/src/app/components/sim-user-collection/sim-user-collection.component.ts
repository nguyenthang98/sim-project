import { Component, OnInit } from "@angular/core";
import { SimApiService } from "../../services/sim-api.service";

@Component({
	selector: "app-sim-user-collection",
	templateUrl: "./sim-user-collection.component.html",
	styleUrls: ["./sim-user-collection.component.css"]
})
export class SimUserCollectionComponent implements OnInit {
	constructor(private simApiService: SimApiService) {}

	avatarUrl: string;

	ngOnInit() {
		this.avatarUrl = `http://localhost:3000/${localStorage.avatar ||
				sessionStorage.avatar}`;
	}

	changeAvatar() {
		const inputFile = document.createElement("input");
		inputFile.type = "file";

		inputFile.addEventListener("change", () => {
			const file = <File>inputFile.files[0];
			const payload = new FormData();
			payload.append("file", file, file.name);
			this.simApiService.changeAvatar(payload).subscribe(res => {
				console.log(res);
			});
		});

		inputFile.click();
	}
}
