import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DelicacyComponent } from './delicacy/delicacy.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent} from './signin/signin.component';
import { UserComponent } from './user/user.component';
import { ExhibitionComponent } from './exhibition/exhibition.component';
import { PictureComponent } from './picture/picture.component';
import { UserInformationModifyComponent } from './user-information-modify/user-information-modify.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { ForgetComponent } from './forget/forget.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { VedioDetailComponent } from './vedio-detail/vedio-detail.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { PictxtDetailComponent } from './pictxt-detail/pictxt-detail.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo: '/delicacy', pathMatch: 'full' },
  { path: 'delicacy', component: DelicacyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'user', component: UserComponent },
  { path: 'exhibition', component: ExhibitionComponent },
  { path: 'picture', component: PictureComponent },
  { path: 'informationmodify', component: UserInformationModifyComponent},
  { path: 'information', component: UserInformationComponent},
  { path: 'collection', component: UserCollectionComponent},
  { path: 'menu-detail/:postid', component: MenuDetailComponent },
  { path: 'music-detail/:postid', component: MusicDetailComponent },
  { path: 'video-detail/:postid', component: VedioDetailComponent },
  { path: 'pictxt-detail/:postid', component: PictxtDetailComponent },
  { path: 'passwordforget', component: ForgetComponent},
  { path: 'upload', component: TestComponent},
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
