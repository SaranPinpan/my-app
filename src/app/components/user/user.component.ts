import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { combineLatest } from 'rxjs'

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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
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
    })
  }

  onClear() {
    this.username = null
    this.reference = null
    this.msg = null
  }
}
