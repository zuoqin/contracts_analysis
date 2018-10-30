import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Components*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegionsTagSelectedComponent } from './components/regions-tag-selected/regions-tag-selected.component';
import { SearchComponent } from './components/search/search.component';
import { PriceTableComponent } from './components/prices-table/prices-table.component';
import { ChartLegendComponent } from './components/chart-legend/chart-legend.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';



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
		ProductPricesComponent,
		SupplierRiskIndexComponent,
		CategorySliderComponent,
		ProductSupplierComponent,
		CommercialOffersComponent
	} from './components/search/suppliers';



import { 
		DateRangeFilterComponent,
		ColumnsFilterComponent,
		InputFilterComponent,
		InputFilterRangeComponent,
		ListFilterComponent,
		RadioFilterComponent
	 } from './components/filters';



import { AutocompleteFieldComponent } from './components/autocomplete-field/autocomplete-field.components';


import { 
		AddCommercialProposalModalComponent,
		AddSupplierModalComponent,
		SentCommercialProposalModalComponent,
		SendingCPModalComponent,
		TextModalComponent
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
import { CoreModule } from './core/core.module';





/*Plugins */
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2CompleterModule } from "ng2-completer";
import { ChartModule } from 'angular-highcharts';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import {TooltipModule} from 'ng2-tooltip-directive';
import { Autosize } from 'ng-autosize/src/autosize.directive';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { CKEditorModule } from 'ng2-ckeditor';
import { DataTableModule } from "angular-6-datatable";
import { BsModalModule } from 'ng2-bs3-modal';
import { NgxMaskModule } from 'ngx-mask'
import { SlickModule } from 'ngx-slick';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SearchFilterProduct,
		SearchFilterSupplierComponent,
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
		ProductPricesComponent,
		SupplierRiskIndexComponent,
		CategorySliderComponent,
		ProductSupplierComponent,
		PriceTableComponent,
		ChartLegendComponent,
		InputFilterComponent,
		InputFilterRangeComponent,
		ListFilterComponent,
		RadioFilterComponent,
		CommercialOffersComponent,
		TextModalComponent,
		AudioPlayerComponent,
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
		CKEditorModule,
		SlickModule.forRoot()
		
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
