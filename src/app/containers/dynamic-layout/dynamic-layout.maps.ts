import { AppInputButtonComponent } from '../../directives/app-input-button/app-input-button.component';
import { AppInputRadioComponent } from '../../directives/app-input-radio/app-input-radio.component';
import { AppInputTextComponent } from '../../directives/app-input-text/app-input-text.component';
import { AppInputRichTextComponent } from '../../directives/app-input-richtextbox/app-input-richtextbox.component';
import { AppVisualLinkComponent } from '../../directives/app-visual-link/app-visual-link.component';
import { AppVisualTextComponent } from '../../directives/app-visual-text/app-visual-text.component';
import { AppVisualMediaComponent } from '../../directives/app-visual-media/app-visual-media';
import { AppInputDropdownComponent } from '../../directives/app-input-dropdown/app-input-dropdown.component';
import { AppVisualParagraphComponent } from '../../directives/app-visual-paragraph/app-visual-paragraph';
import { AppVisualHeaderParagraphComponent } from '../../directives/app-visual-header-paragraph/app-visual-header-paragraph';
import { AppInputCheckboxComponent } from '../../directives/app-input-checkbox/app-input-checkbox.component';
import { AppInputNumberComponent } from '../../directives/app-input-number/app-input-number.component';
import { AppVisualHeaderBodyComponent } from '../../directives/app-visual-header-body/app-visual-header-body.component';
import { QuestionInputSliderComponent } from './../../directives/question-input-slider/question-input-slider.component';
import { QuestionInputRadioComponent } from '../../directives/question-input-radio/question-input-radio.component';
import { QuestionInputCheckboxComponent } from '../../directives/question-input-checkbox/question-input-checkbox.component';
import { QuestionInputTextComponent } from '../../directives/question-input-text/question-input-text.component';
import { QuestionInputNumberComponent } from '../../directives/question-input-number/question-input-number.component';
import { QuestionInputDropdownComponent } from '../../directives/question-input-dropdown/question-input-dropdown.component';
import { QuestionDatePickerComponent } from '../../directives/question-date-picker/question-date-picker.component';
import { QuestionTimePickerComponent } from '../../directives/question-time-picker/question-time-picker.component';
import { QuestionInputRichTextComponent } from '../../directives/question-input-rich-text/question-input-rich-text.component';
import { QuestionInputRatingComponent } from '../../directives/question-input-rating/question-input-rating.component';
import { AppInputImageUploadComponent } from '../../directives/app-input-image-upload/app-input-image-upload.component';
import { AppModalComponent } from '../../directives/app-modal/app-modal.component';
import { DynamicLoaderComponent } from './dynamic-loader.component';
import { PageLayoutComponent } from '../page-layout/page-layout.component';
import { SectionComponent } from '../page-layout/sections.component';
import { QuestionComponent } from '../page-layout/questions.component';
import { GroupComponent } from '../page-layout/groups.component';
import { GroupTabComponent } from '../page-layout/group-tab.component';


export const DynamicLayoutMaps = {
    'BUTTON': AppInputButtonComponent,
    'CHECK_BOX': AppInputCheckboxComponent,
    'DROP_DOWN': AppInputDropdownComponent,
    'HEADER_BODY': AppVisualHeaderBodyComponent,
    'HEADER_PARAGRAPH': AppVisualHeaderParagraphComponent,
    'NUMERIC': AppInputNumberComponent,
    'PARAGRAPH': AppVisualParagraphComponent,
    'RADIO_BUTTON': AppInputRadioComponent,
    'RICH_TEXT': AppInputRichTextComponent,
    'TEXT_BOX': AppInputTextComponent,
    'PASSWORD': AppInputTextComponent,
    'VIEW_LABEL': AppVisualTextComponent,
    'VIEW_LINK': AppVisualLinkComponent,
    'IMAGE_UPLOAD': AppInputImageUploadComponent,
    'QCHECK_BOX': QuestionInputCheckboxComponent,
    'DATE': QuestionDatePickerComponent,
    'QDROP_DOWN': QuestionInputDropdownComponent,
    'QNUMERIC': QuestionInputNumberComponent,
    'QRADIO_BUTTON': QuestionInputRadioComponent,
    'QRATING': QuestionInputRatingComponent,
    'QRICH_TEXT': QuestionInputRichTextComponent,
    'QSLIDER_WITHOUT_SCALE': QuestionInputSliderComponent,
    'QTEXT_BOX': QuestionInputTextComponent,
    'QTIME': QuestionTimePickerComponent,
    'QVIEW_MEDIA': AppVisualMediaComponent
};

export const layoutMaps = [AppInputButtonComponent,
    AppInputCheckboxComponent,
    AppInputDropdownComponent,
    AppVisualHeaderBodyComponent,
    AppVisualHeaderParagraphComponent,
    AppInputNumberComponent,
    AppVisualParagraphComponent,
    AppInputRadioComponent,
    AppInputRichTextComponent,
    AppInputTextComponent,
    AppVisualTextComponent,
    AppVisualLinkComponent,
    AppInputImageUploadComponent,
    QuestionInputCheckboxComponent,
    QuestionDatePickerComponent,
    QuestionInputDropdownComponent,
    QuestionInputNumberComponent,
    QuestionInputRadioComponent,
    QuestionInputRatingComponent,
    QuestionInputRichTextComponent,
    QuestionInputSliderComponent,
    QuestionInputTextComponent,
    QuestionTimePickerComponent,
    AppVisualMediaComponent,
    DynamicLoaderComponent];

export const dynamicModuleMaps = [AppInputButtonComponent,
    AppInputCheckboxComponent,
    AppInputDropdownComponent,
    AppVisualHeaderBodyComponent,
    AppVisualHeaderParagraphComponent,
    AppInputNumberComponent,
    AppVisualParagraphComponent,
    AppInputRadioComponent,
    AppInputRichTextComponent,
    AppInputTextComponent,
    AppVisualTextComponent,
    AppVisualLinkComponent,
    AppInputImageUploadComponent,
    QuestionInputCheckboxComponent,
    QuestionDatePickerComponent,
    QuestionInputDropdownComponent,
    QuestionInputNumberComponent,
    QuestionInputRadioComponent,
    QuestionInputRatingComponent,
    QuestionInputRichTextComponent,
    QuestionInputSliderComponent,
    QuestionInputTextComponent,
    QuestionTimePickerComponent,
    AppVisualMediaComponent,
    AppModalComponent];

export const pageLayoutModuleMaps = [AppInputButtonComponent,
    AppInputCheckboxComponent,
    AppInputDropdownComponent,
    AppVisualHeaderBodyComponent,
    AppVisualHeaderParagraphComponent,
    AppInputNumberComponent,
    AppVisualParagraphComponent,
    AppInputRadioComponent,
    AppInputRichTextComponent,
    AppInputTextComponent,
    AppVisualTextComponent,
    AppVisualLinkComponent,
    AppInputImageUploadComponent,
    QuestionInputCheckboxComponent,
    QuestionDatePickerComponent,
    QuestionInputDropdownComponent,
    QuestionInputNumberComponent,
    QuestionInputRadioComponent,
    QuestionInputRatingComponent,
    QuestionInputRichTextComponent,
    QuestionInputSliderComponent,
    QuestionInputTextComponent,
    QuestionTimePickerComponent,
    AppVisualMediaComponent,
    PageLayoutComponent,
    SectionComponent,
    QuestionComponent,
    GroupComponent,
    GroupTabComponent];

