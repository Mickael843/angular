import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Collection } from 'ngx-pagination/dist/paginate.pipe';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Arrumar um jeito de utilizar um Observable
  users: Array<User> = new Array;
  //users: Observable<User[]>;

  name: string;

  currentPage: number;

  totalItems: number;

  config: any = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 6
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.content;
        this.config = {
          itemsPerPage: 6,
          currentPage: 1,
          totalItems: data.totalElements
        }
      }
    );
  }

  deleteUser(uuid: string, index: number) {
    if (confirm('Deseja mesmo remover o usuario?')) {
      this.userService.deleteUser(uuid).subscribe(
        data => {
          this.users.splice(index, 1);
        }
      );
    }
  }

  findByName() {
    if (this.name !== undefined && this.name !== '') {
      this.userService.findByName(this.name).subscribe(
        data => {
          this.users = data.content;
          this.config = {
            itemsPerPage: 6,
            currentPage: this.currentPage,
            totalItems: data.totalElements
          }
        }
      );
    } else {
      this.userService.getUsers().subscribe(
        data => {
          this.users = data.content;
          this.config = {
            itemsPerPage: 6,
            currentPage: 1,
            totalItems: data.totalElements
          }
        }
      );
    }
  }

  loadPage(event) {
    this.currentPage = event;
    this.userService.getUsersPage(this.currentPage - 1).subscribe(
      data => {
        this.users = data.content;
        this.config = {
          itemsPerPage: 6,
          currentPage: this.currentPage,
          totalItems: data.totalElements
        };
      }
    );
  }

  reportDownload() {
    this.userService.reportDownload();
  }
}
