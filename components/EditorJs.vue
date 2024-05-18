<template>
  <div id="editor" :class="props.classAttributes"></div>
</template>

<script setup>
  import EditorJS from "@editorjs/editorjs";
  import Header from "@editorjs/header";
  import List from "@editorjs/list";
  import RawTool from '@editorjs/raw';
  import SimpleImage from "@editorjs/simple-image";
  import Checklist from '@editorjs/checklist'
  import Embed from '@editorjs/embed';
  import Quote from '@editorjs/quote';
  import CodeTool from '@editorjs/code';
  import InlineCode from '@editorjs/inline-code';
  import Table from '@editorjs/table'
  import Marker from '@editorjs/marker';
  import Delimiter from '@editorjs/delimiter';
  import Underline from '@editorjs/underline';
  import { onMounted } from "vue";

  function isEmptyObject(obj) {
    if (!obj) return true;

    for (var i in obj) return false;
    return true;
  }

  const props = defineProps({
    classAttributes: {
      default: "",
    },
    modelValue: {
      default: {},
    },
    readonly: {
      default: false,
    }
  });

  const emit = defineEmits(["update:modelValue"]);

  onMounted(() => {
    const editor = new EditorJS({
      holder: "editor",
      minHeight: 0,
      tools: {
        header: Header,
        quote: Quote,
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        image: SimpleImage,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        embed: Embed,
        raw: RawTool,
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        table: Table,
        Marker: {
          class: Marker,
        },
        delimiter: Delimiter,
        underline: Underline
      },
      onChange: (api, event) => {
        api.saver.save().then(async (data) => {
          emit("update:modelValue", data);
        });
      },
      data: props.modelValue,
      readOnly: props.readonly,
    });

    watch(() => props.modelValue, async (newValue, oldValue) => {
      if (isEmptyObject(oldValue) && newValue){
        editor.isReady.then(() => {
          editor.render(newValue);
        });
      }
    })
  });
</script>