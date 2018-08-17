import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Components*/
import { AppComponent } from '../components/app.component';
import { HeaderComponent } from '../components/header/header.component';
import { SearchFilterProduct }  from '../components/search-filter/search-filter-product/search-filter-product.component';
import { SearchFilterSupplier } from '../components/search-filter/search-filter-supplier/search-filter-supplier.component';
import { SearchFilterSpgz } from '../components/search-filter/search-filter-spgz/search-filter-spgz.component';
import { RegionsTagSelectedComponent } from '../components/regions-tag-selected/regions-tag-selected.component';



/*Directives*/
import { OnlyNumber } from '../directives/onlynumber.directive';

/*Moduls*/
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

/*Plugins */
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SearchFilterProduct,
		SearchFilterSupplier,
		SearchFilterSpgz,
		RegionsTagSelectedComponent,
		OnlyNumber
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
