import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Components*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegionsTagSelectedComponent } from './components/regions-tag-selected/regions-tag-selected.component';
import { SearchComponent } from './components/search/search.component';
import { 
		SearchProductComponent,
		CategoryProductComponent,
		PriceProductComponent,
		PriceChartComponent,
		PurchaseTableComponent,
		SearchFilterProduct,
		SuppliersTableComponent
	} from './components/search/product';
	
import { 
		SearchFilterSupplierComponent,
		SearchSuppliersComponent,
		AboutSupplierComponent,
		FoodPricesComponent } from './components/search/suppliers';
import { SearchFilterSpgz } from './components/search-filter/search-filter-spgz/search-filter-spgz.component';

import { DateRangeFilterComponent } from './components/filters/date-range-filter/date-range-filter.component';
import { ColumnsFilterComponent } from './components/filters/columns-filter/columns-filter.component'


import { AutocompleteFieldComponent } from './components/autocomplete-field/autocomplete-field.components';


import { 
		AddCommercialProposalModalComponent,
		AddSupplierModalComponent,
		SentCommercialProposalModalComponent,
		SendingCPModalComponent
	} from './components/modal';

/*Directives*/
import { OnlyNumber } from './directives/onlynumber.directive';
import { TriggerActiveDirective } from './directives/triggerActive.directive';
import { MaxValue } from './directives/maxValue.directive';
import { MinValue }from './directives/minValue.directive';
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
import { MyDatePickerModule } from 'mydatepicker';
import { NgxEditorModule } from 'ngx-editor';
import { CKEditorModule } from 'ng2-ckeditor';
import { CoreModule } from './core/core.module';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SearchFilterProduct,
		SearchFilterSupplierComponent,
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
		AddSupplierModalComponent,
		SentCommercialProposalModalComponent,
		SendingCPModalComponent,
		SearchSuppliersComponent,
		AboutSupplierComponent,
		FoodPricesComponent,
		OnlyNumber,
		MaxValue,
		MinValue,
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
		TextMaskModule,
		MyDatePickerModule,
		NgxEditorModule,
		CKEditorModule
		
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
