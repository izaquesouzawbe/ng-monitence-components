import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FieldConfig } from '../models/field-config.model';

@Component({
  selector: 'mon-modal-search',
  templateUrl: './mon-modal-search.component.html',
  styleUrls: ['./mon-modal-search.component.css']
})
export class MonModalSearchComponent {

  @Input() dataList: any[] = []; 
  @Input() title: string = '';
  @Input() isVisible: boolean = false;
  @Input() fieldsToShow: FieldConfig[] = [];
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() modelSelect: EventEmitter<any> = new EventEmitter<any>();  
  @Output() onLoad: EventEmitter<void> = new EventEmitter<void>();

  selectedIndex: number = -1;
  selectedIndexOriginal: number = -1;
  currentPageIndex: number = 1;
  pageSize: number = 50;    

  ngOnChanges(changes: SimpleChanges): void {        
    if ('isVisible' in changes && changes['isVisible'].currentValue === true) {      
      this.onLoad.emit();
    }
  }

  onModelSelect(index: number){    
    this.selectedIndexOriginal = index;
    this.selectedIndex = this.calculateRealIndex(index);      
    this.modelSelect.emit(this.dataList[this.selectedIndex]);    
    console.log(this.selectedIndex);
  }

  handleOk(): void {    
    this.onVisibleFalse();
    this.isVisibleChange.emit(this.isVisible);
  }

  handleCancel(): void {  
    this.onVisibleFalse();
    this.onReset();
  }

  onVisibleFalse(){
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);    
  }

  onReset(){    
    this.modelSelect.emit([]);
    this.selectedIndex = -1;
  }

  calculateRealIndex(indexInPage: number): number {
    return (this.currentPageIndex - 1) * this.pageSize + indexInPage;
  }

  onPageIndexChange(pageIndex: number): void {
    this.currentPageIndex = pageIndex;    
    if (this.selectedIndex !== -1) {
      const selectedItem = this.dataList[this.selectedIndex];
      const realIndex = this.dataList.findIndex(item => item === selectedItem);
      if (realIndex !== -1) {
        this.selectedIndex = realIndex % this.pageSize;
      }
    }
  }

  getFieldData(data: any, fieldName: string): any {
    const fieldNames = fieldName.split('.');
    let fieldValue = data;
    for (const name of fieldNames) {
      fieldValue = fieldValue[name];
    }
    return fieldValue;
  }
}
