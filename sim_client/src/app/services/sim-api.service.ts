import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable, from, pipe } from "rxjs";
import { map, filter } from "rxjs/operators";
import { loadFontToDocument } from "../utils";
import { NgxSpinnerService } from "ngx-spinner";

const basePath = "/api";
const baseURL = "http://localhost:3000" + basePath;

const ggFontApiKey = "AIzaSyCmMgSQuny5V9A9ei-a_T5SZw4AMnLP7II"

@Injectable({
  providedIn: "root"
})
export class SimApiService {
  isLogin: boolean;
  baseURL: string;

  private fontList: any[];
  private loadedFont: any[];

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

    this.baseURL = location.origin + basePath;
     this.baseURL = baseURL;
    this.loadedFont = [];
    this.getListFontsAsync().subscribe();
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        "Authorization": localStorage.getItem('token') || sessionStorage.getItem('token')
      })
    }
  }

  getListFontsAsync(filterText?): Observable<any> {
    if (!this.fontList) {
      this.spinner.show();
      return this.httpClient.get(`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${ggFontApiKey}`)
        .pipe(map((res: { kind: string, items: any[] }) => {
          this.fontList = res.items;
          this.spinner.hide();
          return res.items.filter(font => font.family.includes(filterText || ""));
        }));
    } else {
      return from([this.fontList.filter(f => f.family.includes(filterText || ""))]);
    }
  }

  loadFont(fontFamily, variant, callback?) {
    const fontInfo = this.fontList.find(f => f.family == fontFamily);
    if (fontInfo) {
      this.doLoadFont(fontInfo, variant || fontInfo.variants[0], callback);
    } else {
      callback && callback();
    }
  }

  private doLoadFont(fontInfo, variant, callback) {
    const fontName = `${fontInfo.family}-${variant}`;
    if (!this.loadedFont.find(f => f == fontName)) {
      this.httpClient.get(fontInfo.files[variant], { responseType: 'arraybuffer' })
        .subscribe(resFont => {
          loadFontToDocument(resFont, fontInfo.family, () => {
            this.loadedFont.push(fontName);
            callback && callback();
          })
        })
    } else {
      callback && callback();
    }
  }

  // Authentication 
  simLogin(payload: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/auth/login`, payload);
  }

  simRegister(payload: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "/auth/register", payload);
  }

  // User
  getUserInfo(): Observable<any> {
    return this.httpClient.post(this.baseURL + '/user/info', {}, this.getHttpOptions());
  }

  changeAvatar(payload: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "/user/change-avatar", payload, {
      headers: new HttpHeaders({
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token")
      })
    });
  }

  // Image
  createImage(payload: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "/image/new", payload, {
      headers: new HttpHeaders({
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token")
      })
    });
  }

  listImages(): Observable<any> {
    return this.httpClient.post(this.baseURL + "/image/list", {}, this.getHttpOptions());
  }

  downloadImage(payload: any): Observable<any> {
    return this.httpClient.post(this.baseURL + '/image/download', payload, {
      responseType: 'blob',
      headers: this.getHttpOptions().headers
    });
  }

  // Project manager
  newProject(payload) {
    return this.httpClient.post(this.baseURL + '/user/new-project', payload, this.getHttpOptions());
  }

  updateProject(payload) {
    return this.httpClient.post(this.baseURL + '/user/update-project', payload, this.getHttpOptions());
  }

  listProjects() {
    return this.httpClient.post(this.baseURL + '/user/list-projects', {}, this.getHttpOptions());
  }

  infoProject(idProject) {
    return this.httpClient.post(this.baseURL + '/user/info-project', { idProject }, this.getHttpOptions());
  }

  deleteProject(idProject) {
    return this.httpClient.post(this.baseURL + '/user/delete-project', { idProject }, this.getHttpOptions());
  }
}
