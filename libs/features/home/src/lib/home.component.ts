import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Router } from '@angular/router';
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'emi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeTab = 'university';

  tabs = [
    { key: 'university', label: 'University and College', icon: 'assets/shared/images/student.svg' },
    { key: 'work', label: 'Work and Professional', icon: 'assets/shared/images/work.svg' },
    { key: 'school', label: 'School students', icon: 'assets/shared/images/school.svg' },
  ];

  exams = [
    // === UNIVERSITY (5 items)
    {
      category: 'university',
      title: 'LANGUAGECERT General',
      image: 'https://res.cloudinary.com/diy7y6doi/image/upload/v1748877416/Main_Image_fsg9jm.png',
      description: 'A multi-level general English test (A2–C1)',
    },
    {
      category: 'university',
      title: 'IELTS Academic',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'English language test for academic study (B1–C2)',
    },
    {
      category: 'university',
      title: 'TOEFL iBT',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'Internet-based English test for study abroad',
    },
    {
      category: 'university',
      title: 'Duolingo English Test',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'A fast, modern English test for university entrance',
    },
    {
      category: 'university',
      title: 'Cambridge English Advanced',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'English for higher education and professional life',
    },

    // === WORK (4 items)
    {
      category: 'work',
      title: 'LANGUAGECERT Business',
      image: 'https://res.cloudinary.com/diy7y6doi/image/upload/v1748878782/Main_Image_1_wkrnqd.png',
      description: 'English for workplace communication (B1–C2)',
    },
    {
      category: 'work',
      title: 'TOEIC Listening & Reading',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'Popular English test for job applications',
    },
    {
      category: 'work',
      title: 'BULATS',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'Business Language Testing Service',
    },
    {
      category: 'work',
      title: 'Cambridge BEC',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'Business English Certificate',
    },

    // === SCHOOL (3 items)
    {
      category: 'school',
      title: 'LANGUAGECERT LTE for Students',
      image: 'https://res.cloudinary.com/diy7y6doi/image/upload/v1748878754/Main_Image_2_cx1q2y.png',
      description: 'Test for school-level learners (A1–B1)',
    },
    {
      category: 'school',
      title: 'LANGUAGECERT Junior',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'Friendly English test for children',
    },
    {
      category: 'school',
      title: 'Cambridge Young Learners',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      description: 'Pre-A1 Starters to A2 Flyers',
    },
  ];

  newsList = [
    {
      image: 'https://res.cloudinary.com/diy7y6doi/image/upload/v1748878784/Image_ohcxqb.png',
      title: 'Engendering A Culture Of Professional Development',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh conse...',
      date: '2 days ago',
    },
    {
      image: 'https://res.cloudinary.com/diy7y6doi/image/upload/v1748878784/Image_1_p9sdeo.png',
      title: 'Engendering A Culture Of Professional Development',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh conse...',
      date: '2 days ago',

    },
    {
      image: 'https://res.cloudinary.com/diy7y6doi/image/upload/v1748878783/Image_2_t8purv.png',
      title: 'Engendering A Culture Of Professional Development',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh conse...',
      date: '2 days ago',

    },
    {
      image: 'https://res.cloudinary.com/diy7y6doi/image/upload/v1748878784/Image_ohcxqb.png',
      title: 'Engendering A Culture Of Professional Development',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh conse...',
      date: '2 days ago',

    },
  ];


  constructor(private router: Router) { }

  ngOnInit(): void { }

  get filteredExams() {
    return this.exams.filter(e => e.category === this.activeTab);
  }

  selectTab(key: string) {
    this.activeTab = key;
  }


  navigateToRegister() {
    this.router.navigate(['/dang-ky']);
  }

}
