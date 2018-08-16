import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/*Components*/
import { AppComponent } from './../components/app.component';
import { SearchComponent } from './../components/search/search.component';
import { HeaderComponent } from './../components/header/header.component';
import { SearchFormComponent }  from './../components/search-form/search-form.component';
import { RegionsTagSelectedComponent } from './../components/regions-tag-selected/regions-tag-selected.component';

/*Moduls*/
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

/*Plugins */
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
	declarations: [
		AppComponent,
		SearchComponent,
		HeaderComponent,
		SearchFormComponent,
		RegionsTagSelectedComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		NgSelectModule,
		ReactiveFormsModule,
		Ng2CompleterModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
