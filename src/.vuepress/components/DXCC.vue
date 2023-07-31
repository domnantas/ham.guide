<template>
  <div class="dxcc">
    <table>
      <thead>
        <tr>
          <th>{{ $frontmatter.columnNames.prefix }}</th>
          <th>{{ $frontmatter.columnNames.name }}</th>
          <th>{{ $frontmatter.columnNames.continent }}</th>
          <th>{{ $frontmatter.columnNames.ituZone }}</th>
          <th>{{ $frontmatter.columnNames.cqZone }}</th>
          <th>{{ $frontmatter.columnNames.note }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dxcc">
          <td>{{ item.prefix }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.continent }}</td>
          <td>{{ item.ituZone }}</td>
          <td>{{ item.cqZone }}</td>
          <td>{{ item.note }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dxcc from "../data/dxcc.json";

export default {
  data() {
    return {
      dxcc: dxcc
    };
  }
};
</script>