import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserReport } from 'src/app/model/user-report';
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
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: FormatDate },
    { provide: NgbDateAdapter, useClass: FormatDateAdapter }
  ]
})
export class UserReportComponent {

  userReport: UserReport = new UserReport();

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  reportDownload() {
    this.userService.reportDownloadWithParam(this.userReport);
  }
}
