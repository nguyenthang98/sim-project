import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable, from, pipe } from "rxjs";
import { map, filter } from "rxjs/operators";
import { loadFontToDocument } from "../utils";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization:
      localStorage.getItem("token") || sessionStorage.getItem("token")
  })
};

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

  constructor(private httpClient: HttpClient) {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

    this.baseURL = location.origin + basePath;
    // this.baseURL = baseURL;
    this.loadedFont = [];
    this.getListFontsAsync().subscribe();
  }

  getListFontsAsync(filterText?): Observable<any> {
    if (!this.fontList) {
      return this.httpClient.get(`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${ggFontApiKey}`)
        .pipe(map((res: { kind: string, items: any[] }) => {
          this.fontList = res.items;
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

  simLogin(payload: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/auth/login`, payload);
  }

  simRegister(payload: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "/auth/register", payload);
  }

  changeAvatar(payload: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "/user/change-avatar", payload, {
      headers: new HttpHeaders({
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token")
      })
    });
  }

  createImage(payload: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "/image/new", payload, {
      headers: new HttpHeaders({
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token")
      })
    });
  }

  listImages(): Observable<any> {
    return this.httpClient.post(this.baseURL + "/image/list", {}, httpOptions);
  }
}
