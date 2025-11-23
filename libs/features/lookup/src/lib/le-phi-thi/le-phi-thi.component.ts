import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'emi-le-phi-thi',
  templateUrl: './le-phi-thi.component.html',
  styleUrls: ['./le-phi-thi.component.scss'],
})
export class LePhiThiComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  lePhiThiList: any[] = [
    { stt: 1, chungChi: 'Chứng chỉ Tiếng Anh A1', lePhi: '3.490.000 VNĐ' },
    { stt: 2, chungChi: 'Chứng chỉ Tiếng Anh A2', lePhi: '2.750.000 VNĐ' },
    { stt: 3, chungChi: 'Chứng chỉ Tiếng Anh B1', lePhi: '4.200.000 VNĐ' },
    { stt: 4, chungChi: 'Chứng chỉ Tiếng Anh B2', lePhi: '5.600.000 VNĐ' },
    { stt: 5, chungChi: 'Chứng chỉ Tiếng Anh C1', lePhi: '1.800.000 VNĐ' },
    { stt: 6, chungChi: 'Chứng chỉ Tiếng Anh C2', lePhi: '3.150.000 VNĐ' },
    { stt: 7, chungChi: 'Chứng chỉ Tiếng Anh TOEFL', lePhi: '6.900.000 VNĐ' },
    { stt: 8, chungChi: 'Chứng chỉ Tiếng Anh IELTS', lePhi: '4.750.000 VNĐ' },
    { stt: 9, chungChi: 'Chứng chỉ Tiếng Anh Cambridge', lePhi: '2.300.000 VNĐ' },
    { stt: 10, chungChi: 'Chứng chỉ Tiếng Anh TOEIC', lePhi: '5.100.000 VNĐ' },
    { stt: 11, chungChi: 'Chứng chỉ Tiếng Anh PET', lePhi: '3.800.000 VNĐ' },
    { stt: 12, chungChi: 'Chứng chỉ Tiếng Anh FCE', lePhi: '4.600.000 VNĐ' },
  ];
}
