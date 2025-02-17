import en_file from "../languages/en.json";
import hd_file from "../languages/hd.json";
import pak_file from "../languages/pak.json";
import my_file from "../languages/my.json";
import tha_file from "../languages/tha.json";
import bdt_file from "../languages/bdt.json";
import ar_file from "../languages/ar.json";
import bra_file from "../languages/bra.json";
import zh_file from "../languages/zh.json";
import id_file from "../languages/id.json";
import md_file from "../languages/md.json";
import vi_file from "../languages/vi.json";
import rus_file from "../languages/rus.json";

export function getlang_data(lang_code) {
    var lang_data = {};
let lang = lang_code;
if(lang== "en")
{
    lang_data = en_file;
}
else if(lang== "hd")
{
    lang_data = hd_file;
}
else if(lang== "pak")
{
    lang_data = pak_file;     
}
else if(lang== "my")
{
    lang_data = my_file;        
}
else if(lang== "tha")
{
    lang_data = tha_file;         
}
else if(lang== "bdt")
{
    lang_data = bdt_file;               
}
else if(lang== "ar")
{
    lang_data = ar_file;                     
}
else if(lang== "bra")
{
    lang_data = bra_file;                         
}
else if(lang== "zh")
{
    lang_data = zh_file;                             
}
else if(lang== "id")
{
    lang_data = id_file;                                 
}
else if(lang== "md")
{
    lang_data = md_file;                                     
}
else if(lang== "vi")
{
    lang_data = vi_file;                                         
}
else if(lang== "rus")
{
    lang_data = rus_file;                                             
}

  return lang_data;
}