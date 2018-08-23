import { Component, HostListener } from '@angular/core';

@Component({
    selector:"category-product",
    templateUrl:"./category-product.component.html"
})
export class CategoryProductComponent{
    @HostListener('document:click', ['$event'])
    public documentClick(event): void {
        if(!event.target.closest(".catergory-select") && (this.isOpenSubcategory || this.isOpenProduct)){
            this.isOpenSubcategory = false;
            this.isOpenProduct = false;
        }
    }

    isOpenSubcategory:boolean = false;
    isOpenProduct:boolean = false;
    categories = [
        {
            name:"Продукция молочная",
            id:"1",
            subcategory:[
                {
                    name:"Молоко",
                    id:"21",
                    product:[
                        {
                            name:"Молоко пастеризованное",
                            id:"211",
                        },
                        {
                            name:"Молоко нормализованное",
                            id:"212",
                        },
                        {
                            name:"Молоко сухое",
                            id:"213",
                        },
                    ]
                },
                {
                    name:"Творог и творожные изделия",
                    id:"22",
                },
                {
                    name:"Продукция кисломолочная",
                    id:"23",
                    product:[
                        {
                            name:"Сметана",
                            id:"231",
                        },
                        {
                            name:"Йогурты",
                            id:"232",
                        },
                        {
                            name:"Простакваша",
                            id:"233",
                        },
                        {
                            name:"Кисломолочные напитки прочие",
                            id:"234",
                        },
                        {
                            name:"Ряженка",
                            id:"235",
                        },
                        {
                            name:"Кефир",
                            id:"236",
                        },
                    ]
                },
                {
                    name:"Сыры",
                    id:"24",
                },
                {
                    name:"Мороженное",
                    id:"25",
                },
                {
                    name:"Сливки",
                    id:"26",
                },
                {
                    name:"Продукция майонезная",
                    id:"27",
                },
                {
                    name:"Комплексная поставка молочной продукции",
                    id:"28",
                },
                {
                    name:"Молочные продукты прочие",
                    id:"29",
                },
            ]
        },
        
    ]
    selectedCategory = this.categories[0];
    selectedSubCategory =  this.categories[0].subcategory[2];
    selectedProduct = this.categories[0].subcategory[2].product[1];


    selectSubCategory(category){
        this.selectedSubCategory = category;
        this.selectedProduct = null;
        this.isOpenSubcategory = false;
        this.isOpenProduct = true;
    }
    selectProduct(product){
        this.selectedProduct = product;
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
