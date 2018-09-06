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
import { PriceChartComponent } from './components/search/product/price-chart/price-chart.component';
import { PurchaseTableComponent } from './components/search/product/purchase-table/purchase-table.component';
import { DateRangeFilterComponent } from './components/filters/date-range-filter/date-range-filter.component';
import { ColumnsFilterComponent } from './components/filters/columns-filter/columns-filter.component'
import { SuppliersTableComponent } from './components/search/product/suppliers-table/suppliers-table.copmonent';
import { AddCommercialProposalModalComponent } from './components/modal/add-commercial-proposal/add-commercial-proposal-modal.component';
import { AutocompleteFieldComponent } from './components/autocomplete-field/autocomplete-field.components';
/*Directives*/
import { OnlyNumber } from './directives/onlynumber.directive';
import { TriggerActiveDirective } from './directives/triggerActive.directive';

/*Pipes */
import { ThousandsSpacePipe } from './pipes/thousands.pipe';


/*Moduls*/
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular-6-datatable";
import { BsModalModule } from 'ng2-bs3-modal';
import { NgxMaskModule } from 'ngx-mask'


/*Plugins */
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2CompleterModule } from "ng2-completer";
import { ChartModule } from 'angular-highcharts';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import {TooltipModule} from 'ng2-tooltip-directive';
import { Autosize } from 'ng-autosize/src/autosize.directive';
import { TextMaskModule } from 'angular2-text-mask';

import { CoreModule } from './core/core.module';

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
		PriceChartComponent,
		PurchaseTableComponent,
		DateRangeFilterComponent,
		ColumnsFilterComponent,
		SuppliersTableComponent,
		AddCommercialProposalModalComponent,
		AutocompleteFieldComponent,
		OnlyNumber,
		TriggerActiveDirective,
		ThousandsSpacePipe,
		Autosize
	],
	imports: [
		CoreModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		NgSelectModule,
		ReactiveFormsModule,
		Ng2CompleterModule,
		ChartModule,
		DataTableModule,
		MyDateRangePickerModule,
		TooltipModule,
		BsModalModule,
		NgxMaskModule.forRoot(),
		TextMaskModule
		
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
