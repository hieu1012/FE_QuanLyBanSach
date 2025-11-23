import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emi-lich-thi',
  templateUrl: './lich-thi.component.html',
  styleUrls: ['./lich-thi.component.scss'],
})
export class LichThiComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  examList: any[] = [
    {
      date: "20/06/2025",
      time: "15:00 PM",
      title: "IELTS for UKVI General Training on computer",
      description: "Short descriptions",
      location: "Chi nhánh TP. HCM"
    },
    {
      date: "25/07/2025",
      time: "09:30 AM",
      title: "IELTS Academic - Paper Based",
      description: "Kỳ thi IELTS học thuật trên giấy",
      location: "Chi nhánh Hà Nội"
    },
    {
      date: "15/08/2025",
      time: "13:00 PM",
      title: "IELTS Life Skills A1",
      description: "Thi kỹ năng sống Life Skills cấp độ A1",
      location: "Chi nhánh Đà Nẵng"
    },
    {
      date: "05/09/2025",
      time: "08:00 AM",
      title: "IELTS General Training - Paper Based",
      description: "Thi IELTS Tổng quát trên giấy",
      location: "Chi nhánh Cần Thơ"
    }
  ];
}
