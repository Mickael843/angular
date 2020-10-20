import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { UserReport } from '../model/user-report';
import { GenerateUUID } from '../util/generate-uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  public getUsersPage(page): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + '/page/' + page);
  }

  public getUser(uuid: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + '/' + uuid);
  }

  public deleteUser(uuid: string): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + '/' + uuid);
  }

  public findByName(name: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + '/search/' + name);
  }

  public findByNamePerPage(name: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + '/search/' + name + '/page/' + page);
  }

  public saveUser(user): Observable<any> {
    user.uuid = GenerateUUID.generate;
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  public updateUser(user, uuid: string): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl + '/' + uuid, user);
  }

  public deletePhone(uuid, id): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + '/' + uuid + '/phones/' + id);
  }

  public getProfessions(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + '/professions');
  }

  public userAuthenticated(): boolean {
    if(localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

  public reportDownload() {
    return this.http.get(AppConstants.baseUrl + '/report', {responseType: "text"}).subscribe(
      data => { document.querySelector('iframe').src = data },
      error => { alert('Error ao carregar o relatório de usuarios') }
    );
  }

  public reportDownloadWithParam(userReport: UserReport) {
    return this.http.post(AppConstants.baseUrl + '/report', userReport, {responseType: "text"}).subscribe(
      data => { document.querySelector('iframe').src = data },
      error => { alert('Error ao carregar o relatório de usuarios com parâmetros') }
    );
  }

  loadChart(): Observable<any> {
    return this.http.get(AppConstants.baseUrl + '/charts');
  }
}
