<template>
    <div>
        <Upload
                v-show="false"
                :action="uplodaURL"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png','gif']"
                :max-size="2048"
                multiple>
            <Button  ref="upload" icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <script ref="editor" type="text/plain"></script>
        <quill-editor       v-model="content"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)"
                            style="height: 500px"
                            ref="QuillEditor">
            <!-- 自定义toolar -->
        </quill-editor>

    </div>
</template>

<script>
    import {
        Quill,
        quillEditor
    } from 'vue-quill-editor'
    import {ImageResize} from './lib/resize.js'
    Quill.register('modules/imageResize',ImageResize);
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ];




    export default {
        name: 'UE',
        components: {
            quillEditor
        },
        data() {
            return {
                uplodaURL: this.$config.BASE_URL + this.$config.api.UPLOAD,
                editor: '',
                content: '',
                editorOption: {
                    modules: {
                        imageResize:{
                          dispalySize:true
                        },
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': value => {
                                    if (value) {
                                        // 调用iview图片上传
                                        //document.querySelector('.ivu-upload .ivu-btn').click()
                                        this.$refs.upload.$el.click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }},
            }
        },
        props: {
            defaultMsg: {
                type: String
            },
            config: {
                type: Object
            },
            contentson:{
                type: String
            }
        },
        created() {
            this.content=this.contentson;
        },
        methods: {
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },
            handleSuccess (res) {  //富文本框显示上传后的图片
                console.log(this.editor);
                // 获取富文本组件实例
                let quill = this.$refs.QuillEditor.quill;
                // 如果上传成功
                if (res) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'image', this.$config.STATIC_URL+res.url);
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    // 提示信息，需引入Message
                    Message.error('图片插入失败')
                }
            },
        },
        watch:{
            contentson(newVal,oldVal){
                this.content=newVal;
            },
            content(newval,oldval){
                if(newval!==oldval){
                    this.$emit('content',newval)
                }
            }
        }
    }
</script>

<style scoped>

</style>