import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Components*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchFilterProduct }  from './components/search/product/search-filter-product/search-filter-product.component';
import { SearchFilterSupplier } from './components/search-filter/search-filter-supplier/search-filter-supplier.component';
import { SearchFilterSpgz } from './components/search-filter/search-filter-spgz/search-filter-spgz.component';
import { RegionsTagSelectedComponent } from './components/regions-tag-selected/regions-tag-selected.component';
import { SearchComponent } from './components/search/search.component';
import { SearchProductComponent } from './components/search/product/search-product/search-product.component';
import { CategoryProductComponent } from './components/search/product/category-product/category-product.component';
import { PriceProductComponent } from './components/search/product/price-product/price-product.component';

/*Directives*/
import { OnlyNumber } from './directives/onlynumber.directive';

/*Services*/
import { ProductServices } from '@services/product.services';

/*Moduls*/
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

/*Plugins */
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2CompleterModule } from "ng2-completer";
import { ChartModule } from 'angular-highcharts';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SearchFilterProduct,
		SearchFilterSupplier,
		SearchFilterSpgz,
		RegionsTagSelectedComponent,
		SearchComponent,
		SearchProductComponent,
		CategoryProductComponent,
		PriceProductComponent,
		OnlyNumber
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		NgSelectModule,
		ReactiveFormsModule,
		Ng2CompleterModule,
		ChartModule
	],
	providers: [
		ProductServices
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
