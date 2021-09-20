import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { initChangeDetectorIfExisting } from '@angular/core/src/render3/instructions';

@Injectable()
export class CountService {
    constructor(private http:HttpClient){}
    public status = ['Active','Inactive'];
    countStudentsByStatus(){
        var ah: any;
        var avh: any;
        this.status.forEach(elm=>{
            return    this.http.get(`/students/count?${elm}`).pipe(
                    map(res=>{avh = res}),
                   
                )

            }
        )
      }
}