<template>
  <div class="container">
    <h1 class="title">Wikimedia Article Viewer</h1>

    <div class="container">
      <div class="sl">
      <p class="cdx-docs-demo-text">
        Selected Language: {{ selectedLanguageName }}
      </p>
      <cdx-combobox
        v-model:selected="selectedLanguage"
        :menu-items="menuItems"
        placeholder="Select Language"
      />
    </div>
      <br>
    </div>

    <div class="search-container">
      <div class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--has-end-icon">
        <input v-model="articleTitle" class="search-input cdx-text-input__input" placeholder="Enter article title" type="text" />
        <span class="cdx-text-input__icon cdx-text-input__start-icon cdx-demo-css-icon--search"></span>
        <span class="cdx-text-input__icon cdx-text-input__end-icon cdx-demo-css-icon--info-filled"></span>
      </div>
      <br />
      <cdx-button @click="fetchArticle" class="search-button" action="progressive">Fetch Article</cdx-button>
    </div>

    <div v-if="article" class="article-container">
      <h2 class="article-title">{{ article.title }}</h2>
      <p v-if="article.extract" class="article-content">{{ stripHTML(article.extract) }}</p>
      <p v-else class="article-not-found">No article found for "{{ articleTitle }}"</p>
      <p v-if="article.fullurl" class="read-more"><a :href="article.fullurl" target="_blank">Read More</a></p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';
import { fetchArticleInfo } from '../api';

export default defineComponent({
  name: 'ArticleViewer',
  components: { CdxCombobox },

  data() {
    return {
      menuItems: [],
      selectedLanguage: '',
      articleTitle: '',
      article: null,
      languages: {
        en: 'English',
        hi: 'हिन्दी',
        bn: 'বাংলা',
        te: 'తెలుగు',
        es: 'Español',
        fr: 'Français',
        de: 'Deutsch',
        it: 'Italiano',
        pt: 'Português',
        ru: 'Русский',
        ja: '日本語',
        zh: '中文',
        ar: 'العربية',
        nl: 'Nederlands',
        el: 'Ελληνικά',
        ko: '한국어',
        tr: 'Türkçe',
        pl: 'Polski',
        vi: 'Tiếng Việt',
        uk: 'Українська',
        cs: 'Čeština',
        sv: 'Svenska',
        fa: 'فارسی',
        he: 'עברית',
        id: 'Bahasa Indonesia',
        no: 'Norsk',
        fi: 'Suomi',
        ro: 'Română',
        hu: 'Magyar',
        th: 'ไทย',
        da: 'Dansk',
        sr: 'Српски / Srpski',
        ms: 'Bahasa Melayu',
        hr: 'Hrvatski',
      },
    };
  },

  created() {
    this.menuItems = Object.entries(this.languages).map(([code, name]) => ({
      label: `${name} (${code})`,
      value: code,
    }));
  },

  computed: {
    selectedLanguageName() {
      return this.languages[this.selectedLanguage] || '';
    },
  },

  methods: {
    async fetchArticle() {
      try {
        this.article = await fetchArticleInfo(this.articleTitle, this.selectedLanguage);
        if (!this.article) {
          this.article = { title: this.articleTitle, extract: null, fullurl: null };
        }
      } catch (error) {
        console.error(error);
        alert('Failed to fetch article. Please try again.');
      }
    },

    stripHTML(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    },
  },
});
</script>

<style src="../assets/ArticleViewer_styles.css" lang="css"></style>