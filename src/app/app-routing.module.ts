import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFilterProduct } from './components/search-filter/search-filter-product/search-filter-product.component';
import { SearchFilterSupplier } from './components/search-filter/search-filter-supplier/search-filter-supplier.component';
import { SearchFilterSpgz } from './components/search-filter/search-filter-spgz/search-filter-spgz.component';
const routes: Routes = [
	{ 
		path: '', 
		redirectTo: 'product', 
		pathMatch: 'full'
	},
	{ 
		path: 'product', 
		component: SearchFilterProduct,
	},
	{ 
		path: 'supplier', 
		component: SearchFilterSupplier,
	},
	{ 
		path: 'spgz', 
		component: SearchFilterSpgz,
	},
	{ path: '**',  redirectTo: 'product' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [
		RouterModule
	],
})
export class AppRoutingModule { }
