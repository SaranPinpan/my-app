import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username = ''
  reference = ''
  msg = ''
  isSuccess = false

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    this.spinner.show();

    this.http.post<any>('https://blooming-scrubland-70747.herokuapp.com/api', data).subscribe( result => {
      let rs = JSON.stringify(result)
      let obj = JSON.parse(rs)
      if (obj.res_code == 200) {
        this.username = obj.username
        this.reference = obj.reference
        this.msg = obj.msg
      } else {
        this.msg = obj.msg
      }

      (obj.res_code == 200) ? this.isSuccess = true : this.isSuccess = false
      this.spinner.hide();
    })

    
  }

  onClear() {
    this.username = null
    this.reference = null
    this.msg = null
    this.isSuccess = false
  }
}
