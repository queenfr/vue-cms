const path = require('path'); 
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin'); 
//处理bootstrap样式的包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports={
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    mode:'development',
    devServer:{
        open:true,
        port:3000,
        contentBase:'src',
        hot:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename:"[name].[contenthash].css",
            chunkFilename:"[name].[contenthash].css"
        }),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.css$/,use:[MiniCssExtractPlugin.loader,'css-loader']},
            {test:/\.(woff2|woff|eot|ttf|otf|svg)(\?*)?$/,use:"file-loader"},
            //{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:"url-loader?limit=90&name=[hash:8].[name].[ext]"} //将图片url直接转换成了base64格式的字符串
            { //跟上面那种写法一样
                test:/\.(jpg|png|gif|bmp|jpeg)$/,
                loader:'url-loader',
                options:{
                    limit:90,
                    name:'images/[name].[hash:8].[ext]'
                }
            },
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            // webpack默认无法打包vue文件，需要用到第三方loader
            {test:/\.vue$/,use:'vue-loader'}
        ]
    }

}