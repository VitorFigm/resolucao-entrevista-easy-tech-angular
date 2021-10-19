import { Component, Input, OnInit } from '@angular/core';

export type Header<T> = { title: string; keyName: keyof T };

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit {
  @Input() value: T[];
  @Input() headers: Header<T>[];

  constructor() {}

  ngOnInit(): void {}
}
