/**
 * Created by AstaTus on 2016/2/18.
 */

/**
 * 分页插件类
 * @param page {Number} 当前页
 * @param perPage {Number} 每页记录数
 * @param total {Number} 总记录数
 * @param items {dict} 当前页记录列表
 * @constructor
 */
function Paginate(page, perPage, total, items){
    if(!page || page <1){
        page = 1;
    }
    if(!perPage || perPage<1){
        perPage = 20;
    }
    if(!total || total <0){
        total = 0;
    }
    if(!items){
        items = [];
    }
    this.page = page;
    this.perPage = perPage;
    this.total = total;
    this.items = items;
    this.index = null;
    this.currentPageTatol = items.length;
    if(this.total%this.perPage ===0){
        this.pages = parseInt(this.total/this.perPage);
    }else{
        this.pages = parseInt(this.total /this.perPage) + 1;
    }
}

/**
 * 设置当前页数
 * @param page {Number}
 */
Paginate.prototype.setPage = function(page){
    this.page = page;
}

/**
 * 设置每页条数
 * @param perPage
 */
Paginate.prototype.setPerPage = function(perPage){
    this.perPage = perPage;
}

/**
 * 是否有上一页
 * @returns {boolean}
 */
Paginate.prototype.hasPrevPage = function(){
    if(this.page >1){
        return true;
    }
    return false;
}