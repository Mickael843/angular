import { error } from '@angular/compiler/src/util';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Phone } from 'src/app/model/phone';
import { Profession } from 'src/app/model/profession';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {
  
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if(value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    //return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year: null;
    return date ? validateDate(date.day) + this.DELIMITER + validateDate(date.month) + this.DELIMITER + date.year: null;
  }
}

@Injectable()
export class FormatDate extends NgbDateParserFormatter {
  
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if(value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct): string | null {
    return date ? validateDate(date.day) + this.DELIMITER + validateDate(date.month) + this.DELIMITER + date.year: '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    //return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year: null;
    return date ? validateDate(date.day) + this.DELIMITER + validateDate(date.month) + this.DELIMITER + date.year: null;
  }
}

function validateDate(value: any) {
  if(value.toString !== '' && parseInt(value) <= 9) {
    return '0' + value;
  }
  return value;
}

@Component({
  selector: 'app-root',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: FormatDate },
    { provide: NgbDateAdapter, useClass: FormatDateAdapter }
  ]
})
export class AddUserComponent implements OnInit {

  user = new User();

  phone = new Phone();

  professions: Array<Profession>;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let uuid = this.activatedRoute.snapshot.paramMap.get('uuid');

    this.userService.getProfessions().subscribe(
      data => { this.professions = data }
    );

    if(uuid !== null) {
      this.userService.getUser(uuid).subscribe(
        data => { this.user = data },
        error => {
          alert('Usuário não encontrado');
          this.router.navigate(['home'])
        }
      );
    }
  }

  saveUser() {
    if(this.user.uuid !== null && this.user.uuid !== undefined) {
      this.userService.updateUser(this.user, this.user.uuid).subscribe(
        data => {
          this.newUser();
        }
      );
    } else {
      this.userService.saveUser(this.user).subscribe(
        data => {
          this.newUser();
        }
      );
    }
  }

  deletePhone(id, index) {

    if(id === null && id === undefined) {
      this.user.phones.splice(index, 1);
    }

    if(confirm('Deseja mesmo remover o telefone?') && id !== null && id !== undefined) {
      if(this.user.uuid !== null && this.user.uuid !== undefined) {
        this.userService.deletePhone(this.user.uuid, id).subscribe(
          data => {
            this.user.phones.splice(index, 1);
          },
          error => { alert('Error ao deletar telefone') }
        );
      }
    }
  }

  addPhone() {
    if(this.user.phones === undefined) {
      this.user.phones = new Array<Phone>();
    }

    this.user.phones.push(this.phone);
    this.phone = new Phone();
  }

  newUser() {
    this.user = new User();
    this.phone = new Phone();
  }
}
