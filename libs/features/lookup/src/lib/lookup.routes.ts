import { Routes } from '@angular/router';
import { LookupComponent } from './lookup.component';
import { LichThiComponent } from './lich-thi/lich-thi.component';
import { LePhiThiComponent } from './le-phi-thi/le-phi-thi.component';
import { KetQuaThiComponent } from './ket-qua-thi/ket-qua-thi.component';
import { DeThiMauComponent } from './de-thi-mau/de-thi-mau.component';
export const LookupRoutes: Routes = [
    {
        path: '',
        component: LookupComponent,
        children: [
            { path: 'lich-thi', component: LichThiComponent },
            { path: 'le-phi-thi', component: LePhiThiComponent },
            { path: 'ket-qua-thi', component: KetQuaThiComponent },
            { path: 'de-thi-mau', component: DeThiMauComponent },
        ]
    }
];
