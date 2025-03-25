# adapt-csvToTable

**adapt-csvToTable** is an _extension_ which provides a basic CSV to HTML table Handlebars helper.

## Flags

* `_retainDesktopViewOnMobile=true` = Keep table the same on desktop and mobile.
* `_retainDesktopViewOnMobile=false` = Change table to either one or two column layout.
* `_mobileColumns=1` = Set mobile column count to 1. Only acceptable values are `1` and `2`.
* `_mobileColumns=2` = Set mobile column count to 2. Only acceptable values are `1` and `2`.
* `_hasRowHeaders=true` = Format first column cells as row headers.
* `caption` = Add a table caption as an aria label. Useful for accessibility.

### CSV Format

* `\n` or `\r\n` = new row
* `,` = new column
* `""` = cell containing `\r`, `\n` or `\\"`
* `" "" "` = double speechmark is for escaping speechmarks rather than ending a cell

### CSV in JSON

JSON cannot contain newline characters `\r` or `\n` or speechmarks without escaping them as `\r`, `\n` or `\\"`.

### Column headers only

#### Data CSV

```csv
head1,head2,head3
val1,val2,val3
"value with "" speechmarks",val5,val6
```

#### Handlebars

```hbs
{{#csvToTable}}head1,head2,head3
val1,val2,val3
"value with "" speechmarks",val5,val6{{/csvToTable}}
```

#### Handlebars as JSON

```json
{
  "body": "{{#csvToTable}}head1,head2,head3\nval1,val2,val3\n\"value with \"\" speechmarks\",val5,val6{{/csvToTable}}"
}
```

#### HTML output

```html
<table class="csvtojson__table " data-col-count="3">
  <thead>
    <tr class="csvtojson__head-row">
      <th class="csvtojson__head-cell is-th " scope="col" rowspan="1" colspan="1">
        head1
      </th>
      <th class="csvtojson__head-cell is-th " scope="col" rowspan="" colspan="">
        head2
      </th>
      <th class="csvtojson__head-cell is-th " scope="col" rowspan="" colspan="">
        head3
      </th>
    </tr>
  </thead>
  <tbody>
    <tr class="csvtojson__body-row is-header  csvtojson__row-col-headers">
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        val1
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        val2
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        val3
      </th>
    </tr>
    <tr class="csvtojson__body-row is-body  body-row">
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        val1
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        val2
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        val3
      </td>
    </tr>
    <tr class="csvtojson__body-row is-header  csvtojson__row-col-headers">
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        value with " speechmarks
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        val5
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        val6
      </th>
    </tr>
    <tr class="csvtojson__body-row is-body  body-row">
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        value with " speechmarks
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        val5
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        val6
      </td>
    </tr>
  </tbody>
</table>
```

### Column and row headers

#### Data CSV

```csv
,chead2,chead3
rhead1,val1,val2
rhead2,val3,val4
```

#### Handlebars

```hbs
{{#csvToTable _hasRowHeaders=true _isMobileTwoColumns=true}},chead2,chead3
rhead1,val1,val2
rhead2,val3,val4{{/csvToTable}}
```

#### Handlebars as JSON

```json
{
  "body": "{{#csvToTable _hasRowHeaders=true _isMobileTwoColumns=true}},chead2,chead3\nrhead1,val1,val2\nrhead2,val3,val4{{/csvToTable}}"
}
```

#### HTML output

```html
<table class="csvtojson__table  has-row-headers csvtojson__hasrowheaders is-mobile-two-columns csvtojson__ismobiletwocolumns" data-col-count="3">
  <thead>
    <tr class="csvtojson__head-row">
      <th class="csvtojson__head-cell is-th " scope="col" rowspan="1" colspan="1">

      </th>
      <th class="csvtojson__head-cell is-th " scope="col" rowspan="" colspan="">
        chead2
      </th>
      <th class="csvtojson__head-cell is-th " scope="col" rowspan="" colspan="">
        chead3
      </th>
    </tr>
  </thead>
  <tbody>
    <tr class="csvtojson__body-row is-body  body-row">
      <th class="csvtojson__body-cell is-th " scope="row" colspan="" rowspan="">
        rhead1
      </th>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        <span class="csvtojson__row-col-header">
          chead2
        </span>
        val1
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        <span class="csvtojson__row-col-header">
          chead3
        </span>
        val2
      </td>
    </tr>
    <tr class="csvtojson__body-row is-body  body-row">
      <th class="csvtojson__body-cell is-th " scope="row" colspan="" rowspan="">
        rhead2
      </th>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        <span class="csvtojson__row-col-header">
          chead2
        </span>
        val3
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        <span class="csvtojson__row-col-header">
          chead3
        </span>
        val4
      </td>
    </tr>
  </tbody>
</table>
```

### Adding cell spans and classes

#### Data CSV

```csv
Reliance = Non-High
,Materiality
High,Medium,Low
Complexity,High,T2,T3,T3
Medium,T3,T3,T4
Low,T3,T4,T4
```

#### Styling CSV

Define as `[colspan:rowspan]classname`
```csv
[5:1]align-right
[2:2],[3:1]align-right

[1:3]
```

#### Handlebars

```hbs
{{#csvToTable _hasRowHeaders='' _isMobileTwoColumns=''}}Reliance = Non-High
,Materiality
High,Medium,Low
Complexity,High,T2,T3,T3
Medium,T3,T3,T4
Low,T3,T4,T4{{else}}[5:1]align-right
[2:2],[3:1]align-right

[1:3]{{/csvToTable}}
```

#### Handlebars as JSON

```json
{
  "body": "{{#csvToTable _hasRowHeaders='' _isMobileTwoColumns=''}}Reliance = Non-High\n,Materiality\nHigh,Medium,Low\nComplexity,High,T2,T3,T3\nMedium,T3,T3,T4\nLow,T3,T4,T4{{else}}[5:1]align-right\n[2:2],[3:1]align-right\n\n[1:3]{{/csvToTable}}",
}
```

#### HTML output

```html
<table class="csvtojson__table " data-col-count="5">
  <thead>
    <tr class="csvtojson__head-row">
      <th class="csvtojson__head-cell is-th align-right" scope="col" rowspan="1" colspan="5">
        Reliance = Non-High
      </th>
    </tr>
  </thead>
  <tbody>
    <tr class="csvtojson__body-row is-header  csvtojson__row-col-headers">
      <th class="csvtojson__body-cell is-th " scope="col" colspan="2" rowspan="2">

      </th>
      <th class="csvtojson__body-cell is-th align-right" scope="col" colspan="3" rowspan="1">
        Materiality
      </th>
    </tr>
    <tr class="csvtojson__body-row is-body  body-row">
      <td class="csvtojson__body-cell is-td " colspan="2" rowspan="2">

      </td>
      <td class="csvtojson__body-cell is-td align-right" colspan="3" rowspan="1">
        Materiality
      </td>
    </tr>
    <tr class="csvtojson__body-row is-header  csvtojson__row-col-headers">
      <th class="csvtojson__body-cell is-th " scope="col" colspan="1" rowspan="1">
        High
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        Medium
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        Low
      </th>
    </tr>
    <tr class="csvtojson__body-row is-body  body-row">
      <td class="csvtojson__body-cell is-td " colspan="1" rowspan="1">
        High
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        Medium
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        Low
      </td>
    </tr>
    <tr class="csvtojson__body-row is-header  csvtojson__row-col-headers">
      <th class="csvtojson__body-cell is-th " scope="col" colspan="1" rowspan="3">
        Complexity
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        High
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T2
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T3
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T3
      </th>
    </tr>
    <tr class="csvtojson__body-row is-body  body-row">
      <td class="csvtojson__body-cell is-td " colspan="1" rowspan="3">
        Complexity
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        High
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T2
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T3
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T3
      </td>
    </tr>
    <tr class="csvtojson__body-row is-header  csvtojson__row-col-headers">
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        Medium
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T3
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T3
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T4
      </th>
    </tr>
    <tr class="csvtojson__body-row is-body  body-row">
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        Medium
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T3
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T3
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T4
      </td>
    </tr>
    <tr class="csvtojson__body-row is-header  csvtojson__row-col-headers">
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        Low
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T3
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T4
      </th>
      <th class="csvtojson__body-cell is-th " scope="col" colspan="" rowspan="">
        T4
      </th>
    </tr>
    <tr class="csvtojson__body-row is-body  body-row">
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        Low
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T3
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T4
      </td>
      <td class="csvtojson__body-cell is-td " colspan="" rowspan="">
        T4
      </td>
    </tr>
  </tbody>
</table>
```

## Accessibility notes

A `<caption>` functions like a heading for a table. Captions help users to find a table, understand what it is about and decide if they want to read it. [Read more](https://www.w3.org/WAI/tutorials/tables/caption-summary/)

## Limitations

No known limitations.

----------------------------
**Author / maintainer:** Kineo <br>
**Accessibility support:** WAI AA <br>
**RTL support:** Yes <br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari 14 for macOS/iOS/iPadOS, Opera <br>
