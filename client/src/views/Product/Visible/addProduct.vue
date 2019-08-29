<template>
  <el-dialog title="新增商品"
             :visible.sync="add.show"
             width="90%">
    <div ref="all">
      <el-form ref="sizeForm"
               :model="sizeForm"
               :rules="rules"
               label-width="80px">

        <el-form-item label="产品名称"
                      prop="title">
          <el-input type="text"
                    v-model="sizeForm.title"></el-input>
        </el-form-item>

        <el-form-item label="产品介绍"
                      prop="intro">
          <el-input type="textarea"
                    class="f"
                    v-model="sizeForm.intro"></el-input>
        </el-form-item>
        <!-- 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、 -->

        <!-- <el-form-item label="产品名称">
          <div class="edit_container">
            <quill-editor v-model="content"
                          ref="myQuillEditor"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @change="onEditorChange($event)">
            </quill-editor>
            <button v-on:click="saveHtml">保存</button>
          </div>
        </el-form-item> -->

        <!-- <el-divider></el-divider>
        <el-form-item label="添加内容"
                      prop="title">
          <div v-for="(p,index) in addP"
               :key='index'>

            <a class="file"><input type="file"
                     @change="getFile($event,index)">选择图片</a>
          </div>

          <el-button type="success"
                     style="float:right;display:inline-block"
                     @click="addPictuer">添加图片</el-button>
        </el-form-item> -->

        <!-- 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->

        <el-form-item label="选择类型"
                      prop="typeId">
          <el-select v-model="sizeForm.typeId"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in this.options"
                       :key="item.id"
                       :label="item.type"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传文件">
          <template slot-scope="scope">

            <a class="file"><input type="file"
                     @change="getFile($event,scope.$index)">选择图片</a>

          </template>
        </el-form-item>
        <!-- --------------------------------------------------------------------------- -->
        <el-divider></el-divider>
        <el-form-item label="内容详情"
                      prop="content">
          <div class="fwb">
            <quill-editor v-model="sizeForm.content"
                          :options="editorOption"
                          ref="myQuillEditor"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @change="onEditorChange($event)">
            </quill-editor>
            <!-- <el-button @click="WWW">取消</el-button> -->
          </div>
        </el-form-item>
        <!-- -------------------------------------------------------------------- -->

        <el-divider></el-divider>

      </el-form>

      <div v-for="(form,index) in forms"
           :key="index">
        <el-divider></el-divider>
        <el-form :model="form"
                 :rules="rules"
                 label-width="80px">
          <el-form-item label="价格"
                        prop="price">
            <el-input type="number"
                      :min='1'
                      v-model.number="form.price"></el-input>
          </el-form-item>
          <el-form-item label="服务日期"
                        prop="serviceDate">
            <!-- <el-input type="number"
                      :min='1'
                      :max="7"
                      v-model.number="form.serviceDate"></el-input> -->
            <el-select v-model="form.serviceDate"
                       placeholder="请选择">
              <el-option v-for="item in dates"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="服务时间"
                        prop="serviceTime">
            <el-input-number v-model.number="form.num"
                             style="width:140px;margin-right:15px"
                             placeholder="时长"
                             :min="1"
                             :max="10"
                             @change="setTime(index)"
                             label="小时"></el-input-number>

            <el-time-select placeholder="起始时间"
                            v-model="form.startTime"
                            @change="setTime(index)"
                            :picker-options="{
      start: '06:00',
      step: '01:00',
      end: '21:00'
    }">
            </el-time-select>
            <span> 至 </span>
            <el-time-select placeholder="结束时间"
                            v-model="form.endTime"
                            @change="setTime(index)"
                            :picker-options="{
      start: '06:00',
      step: '01:00',
      end: '21:00',
      minTime: form.startTime
    }">
            </el-time-select>

            <!-- <el-time-select placeholder="选择起始时间"
                            style="margin-left:10px;width:280px"
                            prop="serviceTime"
                            format='HH:mm'
                            @change="changeTime(index)"
                            v-model="form.serviceTime"
                            :picker-options="{
                                        start: '06:00',
                                        step: '01:00',
                                        end: '19:00'
                                      }">
            </el-time-select> -->
          </el-form-item>
          <el-form-item>
            <el-button type="danger"
                       v-show="index !=0"
                       style="float:right;display:inline-block"
                       @click="deleForm(index)">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button type="success"
               style="float:right;display:inline-block"
               @click="addForm">添加</el-button>
    <el-button type="primary"
               @click="onSubmit('form')">立即创建</el-button>
    <el-button @click="add.show=false">取消</el-button>

  </el-dialog>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import { quillRedefine } from 'vue-quill-editor-upload'
import qs from 'qs'
export default {
  name: "logfound",
  props: {
    add: Object,
  },

  data () {
    return {
      dates: [
        {
          value: 1,
          label: '星期一'
        }, {
          value: 2,
          label: '星期二'
        }, {
          value: 3,
          label: '星期三'
        }, {
          value: 4,
          label: '星期四'
        }, {
          value: 5,
          label: '星期五'
        },
        {
          value: 6,
          label: '星期六'
        },
        {
          value: 7,
          label: '星期七'
        }

      ],


      // -------------------
      fileUrl: '',
      file: '',
      addC: [],
      addP: [],
      sizeForm: {
        title: '',
        content: ``,
        intro: '',
        typeId: '',
        picture: ''

      },
      forms: [{        price: '',
        serviceDate: '',
        serviceTime: '',
        num: '',
        endTime: '',
        startTime: ''
      }
      ],
      editorOption: {
        modules: {
          // ImageExtend: {
          //   loading: true,
          //   headers: (xhr) => {

          //     //关键是这句话
          //     xhr.setRequestHeader('token', localStorage.getItem(eleToken));
          //     return xhr
          //     //    Authorization:localStorage.getItem("sessionKey")
          //   },  // 可选参数 设置请求头部
          //   response: (res) => {
          //     return res.data.url
          //   },
          // },

          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],     //列表
            [{ 'script': 'sub' }, { 'script': 'super' }],   // 上下标
            [{ 'indent': '-1' }, { 'indent': '+1' }],     // 缩进
            [{ 'direction': 'rtl' }],             // 文本方向


            [{ 'size': [false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题


            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            [{ 'font': [] }],     //字体
            [{ 'align': [] }],    //对齐方式


            ['clean'],    //清除字体样式
            ['image', 'video']    //上传图片、上传视频

          ]
        },

      },

      rules: {
        title: [
          { required: true, message: "不能为空！" }
        ],
        intro: [
          { required: true, message: "不能为空！" }
        ],
        typeId: [
          { required: true, message: "不能为空！" }
        ],
        price: [
          { required: true, message: "不能为空！" }
        ],
        serviceDate: [
          { required: true, message: "不能为空！" },

        ],
        serviceTime: [
          { required: true, message: "不能为空！" }
        ],
        content: [
          { required: true, message: "不能为空！" }
        ],

      },
      con: false

    };
  },
  components: {
    quillEditor
  },
  computed: {
    options () {
      return this.add.options
    },
    editor () {
      return this.$refs.myQuillEditor.quill;
    },
    // eleToken () {
    //   return String(localStorage.eleToken)
    // }
  },
  mounted () {

  },
  created () {
    this.editorOption = quillRedefine(
      {
        // 图片上传的设置
        uploadConfig: {
          action: `https://www.ruankun.xyz/machinemother/upload/image?token=${localStorage.eleToken}`,  // 必填参数 图片上传地址
          // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
          // 你必须把返回的数据中所包含的图片地址 return 回去
          methods: 'PUT',

          name: 'image',
          loading: true,

          res: (respnse) => {
            console.log(respnse)
            if (respnse.status == -1) {
              console.log('aaa')
              this.$message.error("身份失效，请重新登录")

            }
            // this.sizeForm.content = this.sizeForm.content + `<img src="${respnse.data.data}">`
            return respnse.data // 这里切记要return回你的图片地址
          },
          start: () => {

          },  // 可选参数 接收一个函数 开始上传数据时会触发
        }
      }
    )

  },

  methods: {
    inputNum () {
      console.log('aa')

    },
    // ---------------------------------------
    onEditorReady (editor) { // 准备编辑器
    },
    onEditorBlur () { }, // 失去焦点事件
    onEditorFocus () { }, // 获得焦点事件
    onEditorChange () { }, // 内容改变事件
    saveHtml: function (event) {

    },
    // ------------------------------------------------     content 模块

    setTime (index) {
      let start = parseInt(this.forms[index].startTime)
      let end = parseInt(this.forms[index].endTime)

      if (start > 12) {
        start = "晚" + (start - 12) + '点'
      } else {
        start = "早" + start + '点'
      }

      if (end > 12) {
        end = "晚" + (end - 12) + '点'
      } else {
        end = "早" + end + '点'
      }

      this.forms[index].serviceTime = this.forms[index].num + '小时 ' + `  ` + start + '——' + end
    },
    // numchange (index) {
    //   if (this.forms[index].serviceTime != '') {
    //     let time1 = this.time1
    //     if (time1 > 12) {
    //       time1 = "下午" + (time1 - 12) + '点'
    //     } else {
    //       time1 = "上午" + time1 + '点'
    //     }

    //     let time2 = this.time1 + this.forms[index].num

    //     if (time2 > 12 && time2 <= 24) {
    //       if (time2 < 19) {
    //         time2 = "下午" + (time2 - 12) + '点'
    //       } else {
    //         time2 = "晚上" + (time2 - 12) + '点'
    //       }

    //     } else if (time2 > 24) {
    //       this.$message.error('请选择正确的时间范围')

    //       this.forms[index].serviceTime = ''
    //       return false
    //     } else {
    //       time2 = "上午" + time2 + '点'
    //     }
    //     this.forms[index].serviceTime = this.forms[index].num + '小时 ' + ' ' + time1 + '——' + time2
    //   }
    // },
    // changeTime (index) {
    //   if (this.forms[index].num == '') {
    //     this.$message.error('请填写服务时长')
    //     return false
    //   }
    //   let time1 = parseInt(this.forms[index].serviceTime)
    //   this.time1 = time1
    //   if (time1 > 12) {
    //     time1 = "下午" + (time1 - 12) + '点'
    //   } else {
    //     time1 = "上午" + time1 + '点'
    //   }
    //   let time2 = parseInt(this.forms[index].num) + parseInt(this.forms[index].serviceTime)
    //   this.time2 = time2

    //   if (time2 > 12 && time2 <= 24) {

    //     if (time2 < 19) {
    //       time2 = "下午" + (time2 - 12) + '点'
    //     } else {
    //       time2 = "晚上" + (time2 - 12) + '点'
    //     }
    //   } else if (time2 > 24) {
    //     this.$message.error('请选择正确的时间范围')
    //     console.log('!!!')
    //     this.forms[index].serviceTime = ''
    //     return false
    //   } else {
    //     time2 = "上午" + time2 + '点'
    //   }
    //   this.forms[index].serviceTime = this.forms[index].num + '小时 ' + ' ' + time1 + '——' + time2

    // },
    // ----------------------------------------- 
    getFile (event, index) {
      this.file = event.target.files[0];
    },
    // ---------------------------------------------------------
    deleForm (index) {

      if (index != 0) {
        this.forms.splice(index, 1)
      } else {
        return false
      }
    },
    addForm () {

      this.forms.push({        price: '',
        serviceDate: '',
        serviceTime: '',
        num: '',
        endTime: '',
        startTime: ''
      })


    },
    // ---------------------------------------------------------
    WWW () {
      console.log(this.content)
    },
    // -----------------------------------------------------------
    onSubmit (form) {
      let product = this.sizeForm
      let productProps = this.forms

      this.forms.forEach((item, index) => {
        for (let form of this.forms) {
          for (let i in form) {
            if (form[i] == '') {
              // this.$message.error('请填写服务参数')
              this.con = false
              return false
            } else {
              this.con = true
            }
          }
        }
      })

      if (!this.con) {
        this.$message.error('请填写服务参数')
        return false
      }
      if (this.file) {

        this.$refs['sizeForm'].validate(valid => {
          if (valid) {
            // ----------------------------------------------------------
            event.preventDefault();//取消默认行为

            let formData = new FormData();

            formData.append('image', this.file);
            // ---------------------------------------------------------
            this.$axios.put(`/upload/image?token=${localStorage.eleToken}`, formData).then(
              (res) => {
                this.fileUrl = res.data.data
                this.sizeForm.picture = this.fileUrl
                this.$axios.put(`/product`, {

                  'product': this.sizeForm,
                  'productProps': this.forms


                }
                ).then(res => {
                  // 操作成功

                  if (res.data.status != -1 && res.data.status != 403 && res.status == 200 && res.data.status != -4) {
                    this.$emit('updata')
                    this.add.show = false
                    this.$message.success('上传成功！')
                  } else {
                    this.$message.error('上传失败')
                  }


                }).catch((res) => {
                  this.$message.error('上传失败')
                })

              }
            )
            // -------------------------------------------------------
            // this.$axios.put(`/product`, {

            //   'product': product,
            //   'productProps': productProps


            // }
            // ).then(res => {
            //   // 操作成功
            //   console.log(res)
            //   if (res.data.status == 1) {

            //     this.$emit('updata')
            //     this.add.show = false
            //     this.$message.success('上传成功！')
            //   } else {
            //     this.$message.error('上传失败')

            //   }
            // });
            // -------------------------------------------------------
          }
        });
      } else {
        this.$message.error('请选择图片')
      }

    }
  },

};
</script>

<style scoped>
.f {
  font-size: 22px;
}
.fwb {
  width: 100%;
}
</style>



