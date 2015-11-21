##金雀

##前台功能
- 地址 http://www.mwkong.com:8080/
- 001(完成)首页
- www.canary.com/new/{page}
- www.canary.com/hot
- 001(完成)登录退出
- www.canary.com/login/view
- www.canary.com/login
- www.canary.com/logout
- 003(完成)查询网站信息
- www.canary.com/website
- 004(完成)查询友情链接
- www.canary.com/link
- 005(完成)查询菜单，菜单有头像，网名，签名，分组，说说，美文，菜单属性包含菜单下文章列表的展示风格
- www.canary.com/menu
- 006(完成)分页查询菜单下文章列表，首页 上页 下页 尾页，每次显示十页，每页30条
- www.canary.com/articles/{menu}/{page}
- 007(完成)查询文章
- www.canary.com/article/{id}
- 008(完成)查询广告
- www.canary.com/ad
- 009(完成)关于我们
- www.canary.com/about
- 010(完成)联系我们
- www.canary.com/contact
- 011(完成)投稿
- www.canary.com/contribution
- 012(完成)版权声明
- www.canary.com/copyright
- 013(完成)网站地图
- www.canary.com/sitemap.xml

##后台功能
- 001(完成)基础信息 统计代码
- www.canary.com/admin/website/select
- www.canary.com/admin/website/update?title=金丝雀&description=金丝雀&keywords=金丝雀，金雀&url=www.canary.com&email=canary@qq.com&icp=京ICP证030173号&meta=<script>console.log('website.script');</script>
- 002(完成)菜单
- www.canary.com/admin/menu/insert?name=文章&description=文章&rank=50
- www.canary.com/admin/menu/delete?id=7
- www.canary.com/admin/menu/update?id=1&name=头像&description=头像描述&rank=50
- www.canary.com/admin/menu/select
- 003(完成)标签
- www.canary.com/admin/tag/insert?name=卡通&description=卡通&rank=50
- www.canary.com/admin/tag/delete?id=2
- www.canary.com/admin/tag/update?id=1&name=卡通&description=卡通头像&rank=50
- www.canary.com/admin/tag/select
- 004(完成)文章
- www.canary.com/admin/article/insert?menuId=1&tags=1,2,3&title=山村咏怀&content=一去二三里，烟村四五家。亭台六七座，八九十枝花。&author=邵康节&sourceName=百度百科&sourceUrl=http://baike.baidu.com/view/597973.htm&rank=50
- www.canary.com/admin/article/delete?id=2
- www.canary.com/admin/article/update?id=1&menuId=1&tags=1,2,3,4&title=山村咏怀update&content=一去二三里，烟村四五家。亭台六七座，八九十枝花。update&author=邵康节update&sourceName=百度百科update&sourceUrl=http://baike.baidu.com/view/597973.htm&rank=100
- www.canary.com/admin/article/select?id=1
- www.canary.com/admin/articles/select?menuId=1&page=1&count=30&title=山村咏怀
- www.canary.com/admin/image/upload
- 005(完成)数据
- www.canary.com/admin/database/execute?sql=show tables
- 006(完成)链接
- www.canary.com/admin/link/update?value=友情链接
- www.canary.com/admin/link/select
- 007(完成)广告
- www.canary.com/admin/ad/update?name=topAd&value=上部广告
- www.canary.com/admin/ad/select
- 008(完成)日志
- www.canary.com/admin/log/select?username=canary&page=1&count=30
- 009(完成)用户
- www.canary.com/admin/user/insert?username=spring&password=spring&question=您自己的姓名是&answer=spring&role=User&mobile=18688888888&email=spring@qq.com
- www.canary.com/admin/user/delete?id=4
- www.canary.com/admin/user/update?id=4&nickname=spring1&password=spring1&question=您自己的姓名是&answer=spring1&role=USER&email=spring1@qq.com&mobile=120&qq=80000&sex=Secret&age=25&birthday=2000-01-01 12:00:00
- www.canary.com/admin/user/select?id=4&username=china&mobile=18688888880&page=1&count=30
- 010(完成)权限
- www.canary.com/admin/privilege/select
- 011(完成)缓存
- www.canary.com/admin/cache/select
- www.canary.com/admin/cache/clear?key=tmp

##需求
- 文章那块不使用关联表查询，使用多次查询看看是否会快一点
- 登录，绑定微信，QQ登陆，管理员解绑账号；登录后可以进行赞，踩，评论
- 安装过程优化

##参考资料
http://36kr.com/
http://toutiao.com/
- https://mybatis.github.io/mybatis-3/sqlmap-xml.html
- http://jxd-zxf.iteye.com/blog/2072300
- http://www.oschina.net/question/1261086_228410

##修改数据库编码
show variables like '%character%';
vi /etc/my.cnf default-character-set=utf8
ALTER DATABASE `canary` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
SET character_set_server utf8;