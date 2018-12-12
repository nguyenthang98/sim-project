import { Component } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config.model';
import { SimApiService } from 'src/app/services/sim-api.service';
import { SimProjectSelectorComponent } from 'src/app/components/sim-app-components/dialogs/sim-project-selector/sim-project-selector.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sim-main-layout',
  templateUrl: './sim-main-layout.component.html',
  styleUrls: ['./sim-main-layout.component.css']
})
export class SimMainLayoutComponent {
  appConfig: AppConfig; 
  private containerId: string = "sim-work-area" + Date.now();

  constructor(
    private simApiService: SimApiService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) { }

  ngAfterContentInit() {
    setTimeout(() => {
      const idProject = +this.route.snapshot.paramMap.get('idProject');
      if (idProject) {
        this.spinner.show();
        this.simApiService.infoProject(idProject)
          .subscribe((info: any) => {
            if (info.code == 200) {
              this.appConfig = new AppConfig(info.content);
              setTimeout(() => {
                this.appConfig.initStage(this.getContainerId());
                this.appConfig.updateAllFonts(this.simApiService);
                this.spinner.hide();
              })
            } else {
              this.router.navigate(['/editor']);
            }
          })
      } else {
        const dialogRef = this.dialog.open(SimProjectSelectorComponent, {
          disableClose: true,
          data: {
            showReturnHomeButton: true
          }
        })
        dialogRef.afterClosed().subscribe(idPrj => {
          if (idPrj) {
            this.router.navigate([`/editor/${idPrj}`]);
          }
        })
      }
    })
  }

  getContainerId(): string {
    return this.containerId;
  }
}
