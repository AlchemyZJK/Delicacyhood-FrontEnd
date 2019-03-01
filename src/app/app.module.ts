import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog'; // add by zxy
import { Message } from 'primeng/components/common/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { FileUploadModule } from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { DelicacyComponent } from './delicacy/delicacy.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DelicacyCollectionComponent } from './delicacy-collection/delicacy-collection.component';
import { AppRoutingModule } from './app-routing.module';
import { DelicacySearchComponent } from './delicacy-search/delicacy-search.component';
import { DelicacyRemarkComponent } from './delicacy-remark/delicacy-remark.component';


import { TabViewModule } from 'primeng/tabview';
import { DelicacyCollectionClickComponent } from './delicacy-collection-click/delicacy-collection-click.component';
import { ExhibitionComponent } from './exhibition/exhibition.component';
import { PictureComponent } from './picture/picture.component';
import { UserRemarkComponent } from './user-remark/user-remark.component';
import { MenubarModule } from 'primeng/menubar';
import { UserInformationComponent } from './user-information/user-information.component';
import { UserInformationModifyComponent } from './user-information-modify/user-information-modify.component';

import { LogoutComponent } from './logout/logout.component';
import { LogoffComponent } from './logoff/logoff.component';
import { PasswordModifyComponent } from './password-modify/password-modify.component';
import { ForgetComponent } from './forget/forget.component';

import { UserIdService } from './user-id.service';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { ApiService } from './api.service';
import { UploadFileService } from './upload-file.service';
import { GlobalsService } from './globals.service';
import { TestComponent } from './test/test.component';
import { VedioDetailComponent } from './vedio-detail/vedio-detail.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { PictxtDetailComponent } from './pictxt-detail/pictxt-detail.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { DataViewModule } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    UserCollectionComponent,
    DelicacyComponent,
    UserComponent,
    LoginComponent,
    SigninComponent,
    DelicacyCollectionComponent,
    DelicacySearchComponent,
    DelicacyRemarkComponent,
    DelicacyCollectionClickComponent,
    ExhibitionComponent,
    PictureComponent,
    UserRemarkComponent,
    UserInformationComponent,
    UserInformationModifyComponent,
    LogoutComponent,
    LogoffComponent,
    PasswordModifyComponent,
    MenuDetailComponent,
    PasswordModifyComponent,
    ForgetComponent,
    TestComponent,
    VedioDetailComponent,
    MusicDetailComponent,
    PictxtDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,

    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule,
    TabViewModule,
    CardModule,
    MenubarModule,
    DialogModule,
    ClarityModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ClrFormsNextModule,
    FileUploadModule,
    DataViewModule,
    ProgressSpinnerModule
  ],
  providers: [
    UserIdService,
    ApiService,
    UploadFileService,
    GlobalsService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
