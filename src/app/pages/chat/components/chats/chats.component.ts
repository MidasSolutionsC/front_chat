import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/core/models';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy, OnChanges {

  // Datos de entrada
  @Input() data: any = null;

  // Datos de salida
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();


  private subscription: Subscription = new Subscription();

  constructor() { }

  
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.data && !changes.data.firstChange){
     this.onChangeData();
    }
  }

  
  onChangeData() {
    throw new Error('Method not implemented.');
  }



  chatUsername(name: string){
    console.log(name)
  }

  // onChangeData(){
  //   if(this.data){
  //     if(this.addressForm){
  //       this.addressForm.setValue(Address.cast(this.data));
  //     }
  //     this.isNewData = false;
  //     setTimeout(() => {
  //       this.focusDomicilio.nativeElement.focus();
  //     }, 50);
  //   } else {
  //     this.isNewData = true;
  //   }
  // }

  
}
