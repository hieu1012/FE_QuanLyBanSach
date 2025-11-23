## Các yêu cầu để chạy dự án

-   NodeJs V16
-   NPM

## Cài đặt các package

`npm install --legacy-peer-deps`

## Run app

`npm run start:admin` </br>
`npm run start:web`

## Một số câu lệnh sử dụng

-   Tạo lib mới
    `npx nx g @nrwl/angular:lib <tên thư mục cần tạo> --directory <tên thư mục cha>`
    <!-- npx nx g @nrwl/angular:lib feature --directory=features/test-quan-ly-diem -->
<!-- npx nx g @nrwl/angular:component quan-li-diem-test  --project=features-test-quan-ly-diem-feature  --flat -->
-   Xóa lib
    `nx g remove <lib-name>`
    > Note: Để lấy tên của lib có thể vào Angular.json trong dự án để lấy tên lib cần xóa </br>
    > Ex: "features-catalog-data-access": "libs/features/catalog/data-access" => Tên lib là features-catalog-data-access
-   Tạo mới 1 component
    `npx nx g c <tên component>`
    <!-- npx nx g @nrwl/angular:component quan-li-diem --project=features-test-quan-ly-diem-feature -->


ng build --configuration production
firebase deploy
firebase hosting:sites:list
firebase deploy --only hosting:admin





<!-- DEPLOY -->
PS D:\emi> firebase deploy --only hosting

=== Deploying to 'project-emi-5ec92'...

i  deploying hosting

Error: Request to https://firebasehosting.googleapis.com/v1beta1/projects/-/sites/emi-app/versions had HTTP Error: 403, Permission 'firebasehosting.sites.update' denied on resource 'projects/-/sites/emi-app' (or it may not exist)

Having trouble? Try firebase [command] --help
PS D:\emi> firebase target:clear hosting emi
+  Cleared hosting target emi
PS D:\emi> firebase target:apply hosting emi project-emi-5ec92
+  Applied hosting target emi to project-emi-5ec92

Updated: emi (project-emi-5ec92)
PS D:\emi> firebase target
Resource targets for project-emi-5ec92:

[ hosting ]
admin (admin-app-b7492)
emi (project-emi-5ec92)
PS D:\emi> firebase deploy --only hosting

=== Deploying to 'project-emi-5ec92'...

i  deploying hosting
i  hosting[project-emi-5ec92]: beginning deploy...
i  hosting[project-emi-5ec92]: found 31 files in dist/apps/emi
+  hosting[project-emi-5ec92]: file upload complete
i  hosting[admin-app-b7492]: beginning deploy...
i  hosting[admin-app-b7492]: found 7 files in dist/apps/admin
+  hosting[admin-app-b7492]: file upload complete
i  hosting[project-emi-5ec92]: finalizing version...
i  hosting[admin-app-b7492]: finalizing version...
+  hosting[admin-app-b7492]: version finalized
i  hosting[admin-app-b7492]: releasing new version...
+  hosting[project-emi-5ec92]: version finalized
i  hosting[project-emi-5ec92]: releasing new version...
+  hosting[admin-app-b7492]: release complete
+  hosting[project-emi-5ec92]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/project-emi-5ec92/overview
Hosting URL: https://project-emi-5ec92.web.app
Hosting URL: https://admin-app-b7492.web.app