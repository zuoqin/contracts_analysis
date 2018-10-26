import { Component, HostListener, OnInit } from '@angular/core';

/*Services */
import { ProductServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';
@Component({
    selector:"category-product",
    templateUrl:"./category-product.component.html"
})
export class CategoryProductComponent implements OnInit{
    @HostListener('document:click', ['$event'])
    public documentClick(event): void {
        if(!event.target.closest(".catergory-select") && (this.isOpenSubcategory || this.isOpenProduct)){
            this.isOpenSubcategory = false;
            this.isOpenProduct = false;
        }
    }
    selectedProduct:ProductSearch;
    isOpenSubcategory:boolean = false;
    isOpenProduct:boolean = false;

    selectedCategory;
    selectedSubCategory;

    constructor(
        private productServices:ProductServices
    ){

        this.productServices.SelectProductObservable
            .subscribe((selectedProduct)=>{
                this.selectedProduct = selectedProduct;
                if(!this.selectedProduct.selectedFromCategory){
                    this.getCategoriesTree()
                }else{
                    this.selectedProduct.selectedFromCategory = false;
                }
           
            })
    }
    ngOnInit(){
    

    }

    getCategoriesTree(){
        this.productServices.getProductTree(this.selectedProduct.kpgz_id).subscribe(
            response => {
                let path = response.data.path;
                this.selectedCategory = response.data.tree;

                /*sort array */
                this.selectedCategory.subcategory.sort(this.dynamicSort("-is_group"));

                let select = this.selectedCategory.subcategory.filter(category=>category.kpgz_id==path[0])[0]
                if(select.is_group){
                    this.selectedSubCategory =  select;
                }else{
                    this.selectedSubCategory  = null;
                }
            },
            err => {
                console.log(err)
            }
        );
    }
    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    selectSubCategory(category){
        if(!category.is_group && !category.subcategory){
            this.isOpenSubcategory = false;
            this.selectedSubCategory = null;
            this.selectProduct(category)
        }else{
            this.selectedSubCategory = category;
            this.selectedProduct = null;
            this.isOpenSubcategory = false;
            this.isOpenProduct = true;
        }

    }
    selectProduct(product){
        this.selectedProduct = product;
        this.productServices.SearchByNewProductSubject.next(this.selectedProduct)
        this.isOpenProduct = false;
    }
    openSubCategories(){
        this.isOpenSubcategory=true;
        this.isOpenProduct = false;
    }
    openProducts(){
        this.isOpenSubcategory=false;
        this.isOpenProduct=true;
    }
}
