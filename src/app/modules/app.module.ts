import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/*Components*/
import { AppComponent } from './../components/app.component';
import { SearchComponent } from './../components/search/search.component';
import { HeaderComponent } from './../components/header/header.component';

/*Moduls*/
import { AppRoutingModule } from './../app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		SearchComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
