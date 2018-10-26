import createNumberMask from 'text-mask-addons/dist/createNumberMask'
export const CONFIG = {
    seacrhType: [
        {name:"Продукт", id:"product"},
        {name:"Поставщик", id:"supplier"},
        {name:"ID СПГЗ", id:"spgz"}
    ],
    dayLabels:{su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'},
    monthLabels:{ 1: 'Январь', 2: 'Февраль', 3: 'Март', 4: 'Апрель', 5: 'Май', 6: 'Июнь', 7: 'Июль', 8: 'Август', 9: 'Сентябрь', 10: 'Октябрь', 11: 'Ноябрь', 12: 'Декабрь' },
    months:['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    shortMonths:['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    tooltipOptions:{
        'placement': 'bottom',
        'show-delay': 500
    },
    autocompleteProduct:{
        url:'/autocomplete/product?query=',
        titleField:"name",
        searchField:"name"
    },
    autocompleteSupplier:{
        url:'/autocomplete/supplier?query=',
        titleField:"name",
        searchField:"name"
    },
    autocompleteSPGZ:{
        url:'/autocomplete/spgz?query=',
        titleField:"name",
        searchField:"name"
    },
    messageResponse:{
        text:'Загрузка...',
        loading:'Загрузка...',
        noData:'Нет данных для отображения',
        error:'Ошибка загрухки данных.'
    },
    maskPhoneSettings:{
		mask: ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/],
		guide:true,
        showMask:false,
        placeholder:"+7 (___) ___-__-__"
    },
    

    numberDecimalSpaceMaskOptions:{
		mask: createNumberMask({
            prefix: '',
            suffix: '',
            includeThousandsSeparator: true,
            thousandsSeparatorSymbol: ' ',
            allowDecimal: true,
            decimalSymbol: '.',
            decimalLimit: 2,
            integerLimit: null,
            requireDecimal: false,
            allowNegative: true,
            allowLeadingZeroes: false
        })
    },
    numberSpaceMaskOptions:{
		mask: createNumberMask({
            prefix: '',
            suffix: '',
            includeThousandsSeparator: true,
            thousandsSeparatorSymbol: ' ',
            allowDecimal: false,
            integerLimit: null,
            requireDecimal: false,
            allowNegative: true,
            allowLeadingZeroes: false
        }),
    },
    numberMaskOptions:{
		mask: createNumberMask({
            prefix: '',
            suffix: '',
            includeThousandsSeparator: false,
            allowDecimal: false,
            integerLimit: null,
            requireDecimal: false,
            allowNegative: true,
            allowLeadingZeroes: true
        }),
    },
   
}