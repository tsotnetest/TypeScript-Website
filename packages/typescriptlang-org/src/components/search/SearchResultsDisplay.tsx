import React from "react"

import { cx } from "../../lib/cx"
import { useLocalStorage } from "../../lib/useLocalStorage"
import { ResultRow } from "./ResultRow"
import { installerOptions, Installers, PackageSource } from "./constants"
import { RawSearchResult } from "./types"

import "./SearchResultsDisplay.scss"

export type SearchResultsDisplayProps = {
  result?: RawSearchResult
  search: string
}

const SearchByAlgolia = () => <div id="search-by-algolia"><a href="https://www.algolia.com/" title="Search powered by Algolia">
  <svg width="130" height="19" viewBox="0 0 130 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M59.399 0.0439625H72.698C73.3265 0.0426339 73.9299 0.290857 74.3756 0.734107C74.8213 1.17736 75.0729 1.77939 75.075 2.40796V15.642C75.0729 16.2705 74.8213 16.8726 74.3756 17.3158C73.9299 17.7591 73.3265 18.0073 72.698 18.006H59.399C58.7704 18.0073 58.167 17.7591 57.7213 17.3158C57.2756 16.8726 57.0241 16.2705 57.022 15.642V2.40296C57.0232 2.09199 57.0856 1.7843 57.2057 1.49745C57.3258 1.2106 57.5012 0.950218 57.7219 0.731165C57.9426 0.512111 58.2043 0.338677 58.4921 0.220767C58.7798 0.102857 59.088 0.0427783 59.399 0.0439625Z" fill="#5468FF" />
    <path d="M66.2571 4.58194C63.4421 4.58194 61.1571 6.85394 61.1571 9.65994C61.1571 12.4659 63.4411 14.7319 66.2571 14.7319C69.0721 14.7319 71.3571 12.4599 71.3571 9.65394C71.3571 6.84794 69.0781 4.58194 66.2571 4.58194ZM66.2571 13.2339C64.2741 13.2339 62.6641 11.6319 62.6641 9.65994C62.6641 7.68794 64.2741 6.08594 66.2571 6.08594C68.2401 6.08594 69.8501 7.68794 69.8501 9.65994C69.849 10.1306 69.7552 10.5964 69.5741 11.0308C69.3929 11.4652 69.1279 11.8596 68.7942 12.1915C68.4605 12.5234 68.0647 12.7863 67.6294 12.9652C67.194 13.1441 66.7277 13.2354 66.2571 13.2339ZM66.2571 6.81594V9.47994C66.2571 9.55594 66.3391 9.61094 66.4101 9.57294L68.7871 8.34694C68.8421 8.31994 68.8581 8.25394 68.8311 8.19994C68.5807 7.7628 68.2229 7.3968 67.7915 7.13659C67.3602 6.87637 66.8695 6.73056 66.3661 6.71294C66.3111 6.71294 66.2561 6.75694 66.2561 6.81694H66.2571V6.81594ZM62.9271 4.85994L62.6151 4.54994C62.4683 4.40351 62.2694 4.32127 62.0621 4.32127C61.8547 4.32127 61.6558 4.40351 61.5091 4.54994L61.1371 4.91994C61.0643 4.99184 61.0064 5.07748 60.967 5.1719C60.9275 5.26631 60.9072 5.36762 60.9072 5.46994C60.9072 5.57227 60.9275 5.67357 60.967 5.76799C61.0064 5.8624 61.0643 5.94804 61.1371 6.01994L61.4441 6.32494C61.4931 6.37494 61.5651 6.36294 61.6081 6.31494C61.7891 6.06894 61.9861 5.83494 62.2051 5.61694C62.4301 5.39394 62.6601 5.19694 62.9121 5.01794C62.9671 4.98494 62.9721 4.90894 62.9281 4.85994H62.9271ZM67.9281 4.05394V3.43794C67.9278 3.33538 67.9073 3.23387 67.8678 3.13922C67.8284 3.04456 67.7706 2.95861 67.6979 2.88628C67.6252 2.81394 67.5389 2.75663 67.4441 2.71763C67.3492 2.67862 67.2476 2.65868 67.1451 2.65894H65.3211C65.2184 2.65855 65.1166 2.67843 65.0216 2.71745C64.9267 2.75647 64.8403 2.81387 64.7676 2.88633C64.6948 2.9588 64.6371 3.04492 64.5977 3.13975C64.5583 3.23458 64.5381 3.33626 64.5381 3.43894V4.06994C64.5381 4.14094 64.6041 4.18994 64.6751 4.17394C65.1913 4.02562 65.7259 3.95055 66.2631 3.95094C66.7831 3.95094 67.2981 4.02194 67.7971 4.15794C67.8127 4.16175 67.8291 4.16192 67.8448 4.15846C67.8606 4.155 67.8753 4.14798 67.888 4.13795C67.9006 4.12792 67.9108 4.11514 67.9177 4.10058C67.9247 4.08602 67.9282 4.07007 67.9281 4.05394Z" fill="white" />
    <path className="text" d="M5.027 10.246C5.027 10.944 4.775 11.492 4.27 11.89C3.765 12.287 3.069 12.486 2.181 12.486C1.293 12.486 0.566 12.348 0 12.072V10.858C0.358 11.026 0.739 11.159 1.141 11.255C1.544 11.352 1.919 11.4 2.266 11.4C2.774 11.4 3.15 11.303 3.391 11.11C3.50877 11.0181 3.60308 10.8995 3.66618 10.7641C3.72928 10.6287 3.75938 10.4803 3.754 10.331C3.7557 10.1898 3.72682 10.0499 3.66933 9.92099C3.61185 9.79205 3.52713 9.67707 3.421 9.58397C3.199 9.37997 2.741 9.13797 2.046 8.85897C1.33 8.56997 0.825 8.23997 0.531 7.86497C0.237 7.49297 0.091 7.04497 0.091 6.52197C0.091 5.86697 0.324 5.35197 0.789 4.97497C1.254 4.59897 1.879 4.41097 2.664 4.41097C3.416 4.41097 4.164 4.57597 4.909 4.90497L4.501 5.95197C3.803 5.65797 3.18 5.51197 2.632 5.51197C2.217 5.51197 1.902 5.60197 1.687 5.78297C1.58202 5.86986 1.49839 5.97969 1.44256 6.104C1.38673 6.22831 1.3602 6.36379 1.365 6.49997C1.365 6.70397 1.408 6.87997 1.494 7.02397C1.58 7.16897 1.721 7.30597 1.918 7.43497C2.115 7.56497 2.469 7.73497 2.981 7.94497C3.558 8.18497 3.98 8.40897 4.249 8.61597C4.518 8.82397 4.714 9.05797 4.84 9.31997C4.965 9.58097 5.028 9.88997 5.028 10.244L5.027 10.246ZM9.007 12.486C8.083 12.486 7.361 12.217 6.84 11.678C6.319 11.139 6.059 10.398 6.059 9.45197C6.059 8.48197 6.301 7.71897 6.784 7.16397C7.267 6.60897 7.932 6.33097 8.777 6.33097C9.561 6.33097 10.181 6.56897 10.635 7.04497C11.09 7.52097 11.317 8.17697 11.317 9.01097V9.69297H7.359C7.377 10.27 7.533 10.713 7.826 11.023C8.12 11.333 8.533 11.487 9.067 11.487C9.418 11.487 9.745 11.454 10.047 11.388C10.3823 11.3111 10.709 11.2006 11.022 11.058V12.084C10.7249 12.2275 10.4107 12.3323 10.087 12.396C9.73069 12.4604 9.36907 12.4909 9.007 12.487V12.486ZM16.467 12.379L16.215 11.552H16.172C15.886 11.914 15.597 12.16 15.307 12.292C15.017 12.422 14.645 12.487 14.19 12.487C13.606 12.487 13.151 12.329 12.823 12.014C12.495 11.699 12.332 11.254 12.332 10.677C12.332 10.065 12.559 9.60297 13.014 9.29097C13.469 8.97897 14.162 8.80897 15.093 8.78097L16.119 8.74897V8.43197C16.119 8.05197 16.03 7.76897 15.853 7.58197C15.676 7.39297 15.401 7.29897 15.029 7.29897C14.725 7.29897 14.433 7.34397 14.154 7.43297C13.8788 7.52109 13.6095 7.62698 13.348 7.74997L12.94 6.84797C13.2748 6.67535 13.6304 6.5463 13.998 6.46397C14.3535 6.37928 14.7175 6.335 15.083 6.33197C15.839 6.33197 16.409 6.49697 16.794 6.82597C17.179 7.15597 17.371 7.67297 17.371 8.37797V12.379H16.467ZM22.144 6.33097C22.398 6.33097 22.608 6.34897 22.772 6.38497L22.648 7.56097C22.4648 7.51764 22.2772 7.49616 22.089 7.49697C21.584 7.49697 21.175 7.66197 20.862 7.99097C20.549 8.32097 20.392 8.74797 20.392 9.27497V12.379H19.13V6.43997H20.118L20.285 7.48697H20.349C20.546 7.13297 20.803 6.85097 21.12 6.64397C21.4223 6.44042 21.7785 6.33178 22.143 6.33197H22.144V6.33097ZM26.269 12.486C25.37 12.486 24.687 12.224 24.22 11.699C23.753 11.174 23.519 10.422 23.519 9.43997C23.519 8.44097 23.763 7.67297 24.252 7.13597C24.741 6.59897 25.447 6.32997 26.371 6.32997C26.998 6.32997 27.562 6.44597 28.063 6.67997L27.682 7.69397C27.148 7.48597 26.708 7.38197 26.361 7.38197C25.333 7.38197 24.819 8.06397 24.819 9.42797C24.819 10.094 24.947 10.594 25.203 10.929C25.459 11.264 25.834 11.431 26.328 11.431C26.887 11.4317 27.4365 11.2873 27.923 11.012V12.113C27.6984 12.2445 27.4549 12.3407 27.201 12.398C26.8943 12.46 26.5819 12.4889 26.269 12.484V12.486ZM34.546 12.379H33.278V8.72697C33.278 8.26897 33.186 7.92697 33.001 7.70097C32.817 7.47497 32.524 7.36297 32.123 7.36297C31.593 7.36297 31.204 7.52097 30.955 7.83797C30.706 8.15497 30.582 8.68597 30.582 9.43097V12.381H29.32V4.02197H30.582V6.14397C30.582 6.48397 30.561 6.84797 30.518 7.23397H30.599C30.7702 6.94866 31.0188 6.71773 31.316 6.56797C31.622 6.40997 31.979 6.33197 32.388 6.33197C33.827 6.33197 34.547 7.05697 34.547 8.50697V12.38L34.546 12.378V12.379ZM42.194 6.33097C42.935 6.33097 43.513 6.60097 43.926 7.13697C44.34 7.67397 44.546 8.42797 44.546 9.39797C44.546 10.372 44.337 11.13 43.918 11.673C43.499 12.215 42.917 12.487 42.172 12.487C41.42 12.487 40.836 12.217 40.421 11.677H40.335L40.104 12.38H39.159V4.02297H40.421V6.00997L40.4 6.66497L40.368 7.21797H40.422C40.823 6.62797 41.414 6.33197 42.194 6.33197V6.33097ZM45.111 6.43797H46.486L47.694 9.80597C47.877 10.286 47.998 10.737 48.059 11.16H48.102C48.134 10.963 48.193 10.724 48.279 10.443C48.365 10.163 48.82 8.82697 49.643 6.43897H51.007L48.466 13.169C48.004 14.404 47.234 15.022 46.156 15.022C45.877 15.022 45.605 14.992 45.34 14.932V13.932C45.53 13.975 45.746 13.996 45.99 13.996C46.599 13.996 47.027 13.643 47.274 12.938L47.494 12.379L45.109 6.43897H45.111V6.43797ZM41.867 7.36197C41.359 7.36197 40.992 7.51197 40.769 7.80997C40.545 8.10997 40.43 8.60997 40.423 9.31097V9.39697C40.423 10.12 40.538 10.644 40.767 10.968C40.996 11.292 41.37 11.454 41.89 11.454C42.338 11.454 42.677 11.277 42.908 10.922C43.139 10.568 43.254 10.055 43.254 9.38597C43.254 8.03597 42.792 7.36097 41.868 7.36097L41.867 7.36197ZM14.587 11.519C15.045 11.519 15.413 11.391 15.691 11.135C15.969 10.879 16.107 10.52 16.107 10.058V9.54197L15.344 9.57397C14.75 9.59497 14.317 9.69497 14.047 9.87197C13.777 10.049 13.641 10.32 13.641 10.686C13.641 10.951 13.72 11.156 13.877 11.301C14.035 11.446 14.271 11.519 14.586 11.519H14.587ZM8.775 7.28697C8.374 7.28697 8.053 7.41397 7.811 7.66797C7.569 7.92197 7.425 8.29297 7.379 8.77997H10.075C10.068 8.28997 9.95 7.91797 9.721 7.66497C9.492 7.41297 9.177 7.28597 8.776 7.28597L8.775 7.28697Z" fill="black" />
    <path className="text" d="M102.162 13.784C102.162 15.239 101.79 16.301 101.039 16.977C100.289 17.653 99.1439 17.99 97.5989 17.99C97.0349 17.99 95.8629 17.881 94.9259 17.674L95.2709 15.985C96.0539 16.148 97.0899 16.192 97.6319 16.192C98.4919 16.192 99.1049 16.018 99.4719 15.669C99.8389 15.32 100.02 14.803 100.02 14.116V13.767C99.7483 13.8918 99.4683 13.9974 99.1819 14.083C98.7937 14.1934 98.3915 14.2466 97.9879 14.241C97.4368 14.2477 96.8891 14.1535 96.3719 13.963C95.8982 13.7876 95.4697 13.5085 95.1179 13.146C94.7549 12.7586 94.4785 12.2984 94.3069 11.796C94.1149 11.256 94.0169 10.291 94.0169 9.58299C94.0169 8.91799 94.1209 8.08498 94.3239 7.52899C94.5173 6.9912 94.8259 6.50214 95.2279 6.09599C95.6382 5.68987 96.1291 5.3744 96.6689 5.16999C97.2887 4.92751 97.9484 4.8037 98.6139 4.80499C99.3099 4.80499 99.9509 4.89198 100.575 4.99599C101.11 5.07949 101.64 5.1903 102.163 5.32799V13.784H102.162ZM96.2069 9.57799C96.2069 10.471 96.4039 11.463 96.7989 11.878C97.1929 12.291 97.7029 12.498 98.3269 12.498C98.6669 12.498 98.9899 12.449 99.2909 12.356C99.5506 12.2819 99.7979 12.1701 100.025 12.024V6.73399C99.5598 6.6347 99.0871 6.57449 98.6119 6.55399C97.8339 6.53199 97.2429 6.84799 96.8259 7.35499C96.4149 7.86199 96.2069 8.74999 96.2069 9.57799ZM112.328 9.57799C112.328 10.298 112.224 10.842 112.01 11.436C111.815 11.9987 111.507 12.5159 111.106 12.956C110.717 13.376 110.252 13.702 109.704 13.931C109.156 14.161 108.313 14.291 107.891 14.291C107.469 14.286 106.631 14.166 106.089 13.931C105.56 13.7077 105.084 13.3755 104.692 12.956C104.291 12.5148 103.982 11.998 103.783 11.436C103.557 10.8429 103.446 10.2125 103.454 9.57799C103.454 8.85899 103.553 8.16798 103.772 7.57899C103.991 6.99099 104.298 6.48899 104.692 6.06999C105.086 5.64999 105.557 5.32999 106.094 5.09999C106.66 4.86826 107.268 4.7533 107.88 4.76199C108.493 4.75645 109.102 4.87128 109.671 5.09999C110.204 5.31655 110.682 5.64771 111.073 6.06999C111.462 6.48999 111.763 6.99098 111.982 7.57999C112.212 8.16699 112.327 8.85999 112.327 9.57799H112.328ZM110.136 9.58299C110.136 8.66299 109.933 7.89399 109.539 7.35999C109.145 6.82099 108.591 6.55399 107.885 6.55399C107.178 6.55399 106.625 6.82099 106.231 7.35999C105.837 7.89999 105.645 8.66199 105.645 9.58299C105.645 10.515 105.842 11.141 106.237 11.681C106.631 12.226 107.185 12.493 107.891 12.493C108.598 12.493 109.151 12.221 109.545 11.681C109.939 11.136 110.137 10.515 110.137 9.58299H110.136ZM117.099 14.291C113.588 14.307 113.588 11.469 113.588 11.017L113.583 0.949985L115.725 0.611985V10.615C115.725 10.871 115.725 12.495 117.1 12.5V14.293H117.099V14.291ZM120.873 14.291H118.72V5.09499L120.873 4.75699V14.291ZM119.794 3.74999C120.138 3.75105 120.468 3.61565 120.713 3.37347C120.957 3.13129 121.096 2.80207 121.098 2.45799C121.098 1.74399 120.517 1.16799 119.794 1.16799C119.071 1.16799 118.49 1.74499 118.49 2.45799C118.49 3.17199 119.076 3.74899 119.794 3.74899V3.74999ZM126.225 4.76199C126.932 4.76199 127.529 4.84899 128.011 5.02399C128.493 5.19799 128.882 5.44399 129.167 5.75399C129.452 6.06499 129.655 6.48899 129.775 6.93599C129.901 7.38299 129.961 7.87298 129.961 8.41198V13.893C129.465 13.9916 128.967 14.0753 128.466 14.144C127.798 14.242 127.047 14.291 126.215 14.291C125.705 14.2951 125.196 14.2421 124.698 14.133C124.275 14.0449 123.875 13.8724 123.52 13.626C123.196 13.3911 122.935 13.0808 122.759 12.722C122.578 12.352 122.485 11.829 122.485 11.284C122.485 10.761 122.589 10.429 122.792 10.069C123 9.70899 123.279 9.41499 123.63 9.18599C124.005 8.94854 124.421 8.78242 124.857 8.69599C125.581 8.54678 126.324 8.51202 127.059 8.59299C127.322 8.61999 127.596 8.66899 127.892 8.73999V8.39099C127.892 8.14599 127.865 7.91198 127.804 7.69398C127.747 7.47913 127.642 7.2799 127.497 7.11099C127.349 6.94199 127.157 6.81099 126.916 6.71899C126.624 6.60875 126.313 6.55349 126.001 6.55599C125.508 6.55599 125.059 6.61598 124.648 6.68699C124.237 6.75799 123.898 6.83999 123.64 6.93199L123.383 5.18299C123.651 5.08999 124.051 4.99799 124.566 4.90499C125.114 4.80827 125.669 4.76075 126.226 4.76299H126.225V4.76199ZM126.404 12.492C127.061 12.492 127.549 12.454 127.888 12.388V10.22C127.242 10.0563 126.57 10.021 125.91 10.116C125.669 10.149 125.45 10.214 125.258 10.307C125.071 10.3941 124.91 10.5294 124.792 10.699C124.671 10.869 124.617 10.966 124.617 11.222C124.617 11.723 124.792 12.012 125.11 12.203C125.433 12.399 125.86 12.493 126.403 12.493H126.404V12.492ZM84.1079 4.81599C84.8149 4.81599 85.4119 4.90299 85.8939 5.07799C86.3759 5.25199 86.7649 5.49799 87.0499 5.80799C87.3399 6.12399 87.5369 6.54298 87.6579 6.98998C87.7839 7.43699 87.8439 7.92698 87.8439 8.46598V13.947C87.3482 14.0456 86.8497 14.1293 86.3489 14.198C85.6809 14.296 84.9299 14.345 84.0979 14.345C83.5879 14.3491 83.0791 14.2961 82.5809 14.187C82.1582 14.0989 81.7575 13.9264 81.4029 13.68C81.0794 13.4451 80.8182 13.1348 80.6419 12.776C80.4609 12.406 80.3679 11.883 80.3679 11.338C80.3679 10.815 80.4719 10.483 80.6749 10.123C80.8829 9.76299 81.1619 9.46899 81.5129 9.23999C81.8883 9.00254 82.3043 8.83642 82.7399 8.74999C83.464 8.60078 84.2071 8.56602 84.9419 8.64699C85.1989 8.67399 85.4789 8.72299 85.7749 8.79399V8.44498C85.7749 8.19999 85.7479 7.96599 85.6869 7.74799C85.6295 7.53313 85.5246 7.3339 85.3799 7.16499C85.2319 6.99599 85.0399 6.86498 84.7989 6.77298C84.5066 6.66275 84.1964 6.60749 83.8839 6.60999C83.3909 6.60999 82.9419 6.66999 82.5309 6.74099C82.1199 6.81199 81.7809 6.89399 81.5229 6.98599L81.2659 5.23699C81.5339 5.14399 81.9339 5.05199 82.4489 4.95899C82.9966 4.85979 83.5524 4.81225 84.1089 4.81699H84.1079V4.81599ZM84.2929 12.552C84.9499 12.552 85.4379 12.514 85.7769 12.448V10.28C85.1307 10.1163 84.4587 10.081 83.7989 10.176C83.5579 10.209 83.3389 10.274 83.1469 10.367C82.9596 10.4541 82.7988 10.5894 82.6809 10.759C82.5599 10.929 82.5059 11.026 82.5059 11.282C82.5059 11.783 82.6809 12.072 82.9989 12.263C83.3169 12.454 83.7489 12.553 84.2919 12.553H84.2929V12.552ZM92.9759 14.29C89.4649 14.306 89.4649 11.468 89.4649 11.016L89.4599 0.947985L91.6019 0.609985V10.613C91.6019 10.869 91.6019 12.493 92.9769 12.498V14.291H92.9759V14.29Z" fill="black" />
  </svg>
</a>
</div>


export const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({
  result,
  search,
}) => {
  const [installer, setInstaller] = useLocalStorage<PackageSource>(
    "dt/search/packageSource",
    PackageSource.Npm
  )

  if (!result) {
    return <div className="loading">...</div>
  }

  if (!result.hits.length) {
    return (
      <div className="empty">
        <div>
          No results found for <strong>{search}</strong>.
        </div>

        <div>Try another search?</div>
      </div>
    )
  }

  const exactMatch = result.hits.find(hit => hit.name === search)

  return (
    <>
      <table className="resultsTable">
        <thead>
          {!search && (
            <tr>
              <th className="popular" colSpan={5}>
                Popular on Definitely Typed
            </th>
            </tr>
          )}
          {exactMatch && (
            <>
              <tr>
                <th colSpan={5}>Exact match</th>
              </tr>
              <ResultRow
                exactMatch
                hit={exactMatch}
                installer={Installers[installer]}
              />
            </>
          )}
          <tr className={cx("headRow", (exactMatch || search) && "afterTop")}>
            <th className="dlsHead">DLs</th>
            <th>Via</th>
            <th>Module</th>
            <th className="updatedHead">Last Updated</th>
            <th className="installHead">
              Install
            <div className="installers">
                {installerOptions.map(installOption => (
                  <button
                    className={cx(
                      "installer",
                      installer === installOption && "installerSelected"
                    )}
                    key={installOption}
                    onClick={() => setInstaller(installOption)}
                  >
                    {installOption}
                  </button>
                ))}
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="resultsRaised">
          {result.hits.map(
            hit =>
              hit.name !== search && (
                <ResultRow
                  hit={hit}
                  key={hit.name}
                  installer={Installers[installer]}
                />
              )
          )}
        </tbody>
      </table>
      <SearchByAlgolia />
    </>
  )
}
