import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Injectable()
export class DashboardService {
  stats = [
    {
      title: 'Total Sales',
      amount: '18',
      color: 'bg-indigo-500',
    },
    {
      title: 'Revenue',
      amount: '7',
      color: 'bg-blue-500',
    },
    {
      title: 'Traffic',
      amount: '121',
      color: 'bg-green-500',
    },
    {
      title: 'New User',
      amount: '9',
      color: 'bg-teal-500',
    },
  ];


  constructor(private http: HttpClient) {}

  getStats() {
    return this.stats;
  }
}
