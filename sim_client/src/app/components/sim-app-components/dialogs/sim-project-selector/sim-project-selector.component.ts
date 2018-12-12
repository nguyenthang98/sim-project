import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material"
import { SimApiService } from 'src/app/services/sim-api.service';
import { ConfirmDialogComponent } from 'src/app/components/sim-app-components/dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { get } from "lodash";

const defaultProjectInfo = {
  attrs: {
    width: 1080,
    height: 1080,
    backgroundColor: "rgb(255, 255, 255)"
  },
  children: {
    attrs: {
      backgroundLayer: {
        attrs: {
          name: "Background",
          bgRect: {
            draggable: false
          }
        }
      }
    },
    children: [],
    className: "LayerList"
  },
  className: "AppConfig"
}

@Component({
  selector: 'sim-project-selector',
  templateUrl: './sim-project-selector.component.html',
  styleUrls: ['./sim-project-selector.component.css']
})
export class SimProjectSelectorComponent {
  projects: any[];
  selectedProject: any;
  showCreateProjectButton: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<SimProjectSelectorComponent>,
    private dialog: MatDialog,
    private simApiService: SimApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public config: any,
  ) {
    this.selectedProject = null;
    this.projects = [];
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.reloadProjectList();
    });
  }

  createNewProject(projectName) {
    const payload = {
      projectName,
      projectInfo: JSON.stringify(defaultProjectInfo)
    }
    this.spinner.show();
    this.simApiService.newProject(payload)
      .subscribe((res: any) => {
        this.spinner.hide();
        if(res.code == 200) {
          this.reloadProjectList();
        }
      })
  }

  reloadProjectList() {
    this.spinner.show();
    this.simApiService.listProjects()
      .subscribe((prjs:any) => {
        if(prjs && Array.isArray(prjs.content)) {
          this.projects = prjs.content;
        } else if(prjs.code == 401) {
          this.router.navigate(["/login"]);
          this.snackBar.open(prjs.reason, "Close", {
            duration: 1500
          })
          this.dialogRef.close();
        } else {
          console.error(prjs);
        }
        this.spinner.hide();
      });
  }

  removeProject(project) {
    const self = this;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: `Do you want to delete project ${project.projectName} permanently?`
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        self.spinner.show();
        self.simApiService.deleteProject(project.idProject)
          .subscribe(res => {
            self.spinner.hide();
            self.reloadProjectList();
          }) 
      };
    })
  }

  returnHomePageButtonClicked() {
    this.router.navigate(["/"]);
    this.dialogRef.close();
  }

  cancelButtonClicked() {
    const currPrjId = get(this, 'config.currentProject')
    if(currPrjId) {
      const isDeleted = !this.projects.find(prj => prj.idProject == currPrjId);
      this.dialogRef.close(isDeleted ? -1 : null);
    } else {
      this.dialogRef.close();
    }
  }

  loadProjectButtonClicked() {
    this.dialogRef.close(this.selectedProject.idProject);
  }
}