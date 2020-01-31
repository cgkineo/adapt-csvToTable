# adapt-csvToTable

### Flags
> _isMobileTwoColumns=true

Add columns headers to row cells

> _isMobileTwoColumns=false

Add columns headers as a separate row in between data rows

> _hasRowHeaders=true

Format first column cells as row headers

#### CSV Format
\n or \r\n = new row  
, = new column  
"" = cell containing \r \n , or \\"  
" "" " = double speechmark is for escaping speechmarks rather than ending a cell  

#### CSV in JSON
JSON cannot contain newline characters \r or \n or speechmnarks without escaping them as \r or \n or \\".

#### Column headers only
```csv
head1,head2,head3
val1,val2,val3
"value with "" speechmarks",val5,val6
```
```hbs
{{#csvToTable}}head1,head2,head3\nval1,val2,val3\n"value with "" speechmarks",val5,val6{{/csvToTable}}
```
```json
{
  "body": "{{#csvToTable}}head1,head2,head3\nval1,val2,val3\n\"value with \"\" speechmarks\",val5,val6{{/csvToTable}}"
}
```
```html
<table>
  <thead>
    <tr>
      <th scope="col">head1</th>
      <th scope="col">head2</th>
      <th scope="col">head3</th>
    </tr>
  </thead>
  <tbody>
    <tr class="csvtojson_rowcolheaders">
      <th scope="col">
        head1
      </th>
      <th scope="col">
        head2
      </th>
      <th scope="col">
        head3
      </th>
    </tr>
    <tr class="csvtojson_rowdata">
      <td>
        val1
      </td>
      <td>
        val2
      </td>
      <td>
        val3
      </td>
    </tr>
    <tr class="csvtojson_rowcolheaders">
      <th scope="col">
        head1
      </th>
      <th scope="col">
        head2
      </th>
      <th scope="col">
        head3
      </th>
    </tr>
    <tr class="csvtojson_rowdata">
      <td>
        value with " speechmarks
      </td>
      <td>
        val5
      </td>
      <td>
        val6
      </td>
    </tr>
  </tbody>
</table>
```

#### Column and row headers
```csv
,chead2,chead3
rhead1,val1,val2
rhead2,val3,val4
```
```hbs
{{#csvToTable _hasRowHeaders=true _isMobileTwoColumns=true}},chead2,chead3\nrhead1,val1,val2\nrhead2,val3,val4{{/csvToTable}}
```
```json
{
  "body": "{{#csvToTable _hasRowHeaders=true _isMobileTwoColumns=true}},chead2,chead3\nrhead1,val1,val2\nrhead2,val3,val4{{/csvToTable}}"
}
```
```html
<table class="csvtojson__hasrowheaders csvtojson__ismobiletwocolumns ">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">chead2</th>
      <th scope="col">chead3</th>
    </tr>
  </thead>
  <tbody>
    <tr class="csvtojson_rowdata">
      <th scope="row">
        rhead1
      </th>
      <td>
        <span class="csvtojson_rowcolheader">chead2</span>
        val1
      </td>
      <td>
        <span class="csvtojson_rowcolheader">chead3</span>
        val2
      </td>
    </tr>
    <tr class="csvtojson_rowdata">
      <th scope="row">
        rhead2
      </th>
      <td>
        <span class="csvtojson_rowcolheader">chead2</span>
        val3
      </td>
      <td>
        <span class="csvtojson_rowcolheader">chead3</span>
        val4
      </td>
    </tr>
  </tbody>
</table>
```
